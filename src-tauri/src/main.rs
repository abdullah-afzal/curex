// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use bcrypt::{hash, DEFAULT_COST};
use std::fs;
use std::io::Write;
use std::path::Path;
use std::env;

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

fn initialize_users_file() -> std::io::Result<()> {
    // Get the current directory of the project
    let current_dir = env::current_dir()?;
    
    // Create a relative path from the current directory
    let path = current_dir.join("data/users.json");

    // Create the directory if it doesn't exist
    if let Some(parent_dir) = path.parent() {
        if !parent_dir.exists() {
            fs::create_dir_all(parent_dir)?;
        }
    }

    // Only create the file if it doesn't exist
    if !path.exists() {
        let password = "admin";
        let password_hash = hash_password(password);
        let admin_user = User {
            username: "admin".to_string(),
            password_hash,
            role: "admin".to_string(),
        };
        let users_data = UsersData {
            admin: admin_user,
            users: vec![],
        };

        let json_data = serde_json::to_string_pretty(&users_data).unwrap();
        fs::write(path, json_data)?;
    }
    Ok(())
}

fn hash_password(password: &str) -> String {
    hash(password, DEFAULT_COST).unwrap()
}


fn main() {
    initialize_users_file().expect("Failed to initialize users file");
    curex_lib::run()
}
