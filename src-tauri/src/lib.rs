use serde::{Deserialize, Serialize};
use bcrypt::{hash, DEFAULT_COST};
use std::fs;
use std::env;
use std::io::Error;
use serde_json;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct User {
    username: String,
    password_hash: String,
    role: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct UsersData {
    admin: User,
    users: Vec<User>,
}


#[tauri::command]
fn sign_in(username: &str, password: &str) -> Result<bool, String> {
    // Read users data from file
    let data: UsersData = read_users_file().map_err(|_| "Failed to read users file")?;
   
    // Find the user
    let user_opt = if username == data.admin.username {
        
        Some(data.admin)
    } else {
        data.users.into_iter().find(|u| u.username == username)
    };

    match user_opt {
        Some(user) => {

            // Verify the entered password against the stored hash
            if bcrypt::verify(&password, &user.password_hash).unwrap_or(false) {
                Ok(true)
            } else {
                Err("Invalid password".into())
            }
        }
        None => Err("User not found".into()),
    }
}

#[tauri::command]
fn get_users() -> Result<Vec<User>, String> {
    let data = read_users_file().map_err(|_| "Failed to read users file")?;
    let mut users = vec![data.admin.clone()];
    users.extend(data.users);
    Ok(users)
}

#[tauri::command]
fn create_user(username: String, role: String) -> Result<(), String> {
    let mut data = read_users_file().map_err(|_| "Failed to read users file")?;
    
    let new_user = User {
        username,
        password_hash: hash_password("pass123"),
        role,
    };

    data.users.push(new_user);

    write_users_file(&data).map_err(|_| "Failed to write users file")?;
    Ok(())
}

#[tauri::command]
fn delete_user(username: String) -> Result<(), String> {
    let mut data = read_users_file().map_err(|_| "Failed to read users file")?;
    
    data.users.retain(|user| user.username != username);
    
    write_users_file(&data).map_err(|_| "Failed to write users file")?;
    Ok(())
}

fn write_users_file(data: &UsersData) -> Result<(), Error> {
    // Get the current directory of the project
    let current_dir = env::current_dir()?;
    
    // Create a relative path from the current directory
    let path = current_dir.join("data/users.json");

    // Serialize the data to JSON format
    let json_data = serde_json::to_string_pretty(&data).unwrap();
    
    // Write the serialized data to the file at the relative path
    fs::write(path, json_data)?;

    Ok(())
}



fn read_users_file() -> Result<UsersData, std::io::Error> {
    // Get the current directory of the project
    let current_dir = env::current_dir()?;
    
    // Create a relative path from the current directory
    let path = current_dir.join("data/users.json");

    // Read the file content
    let json_data = fs::read_to_string(path)?;

    // Deserialize the JSON data into UsersData struct
    let data: UsersData = serde_json::from_str(&json_data).unwrap();
    
    Ok(data)
}

fn hash_password(password: &str) -> String {
    hash(password, DEFAULT_COST).unwrap()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet, sign_in, get_users, create_user, delete_user])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
