package util

import org.mindrot.jbcrypt.BCrypt
/*
    If we need more secured auth, add date in token to ensure timeToLive
 */
fun getSalt(): String{
    return BCrypt.gensalt()
}

fun hashPassword(salt: String, password: String): String{
    return BCrypt.hashpw(password, salt)
}
