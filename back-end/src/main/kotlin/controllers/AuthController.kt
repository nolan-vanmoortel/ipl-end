package controllers

import business.factory.UserFactory
import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import exceptions.NoFatalException
import persistence.dao.UserDao
import policy
import spark.Spark.path
import spark.kotlin.before
import spark.kotlin.get
import spark.kotlin.halt
import spark.kotlin.post
import util.Message
import util.getSalt
import util.hashPassword

fun AuthController(userDao: UserDao, userFactory: UserFactory){
    path("/auth") {
        post("/login") {
            val salt = getSalt()
            try {
                val map = ObjectMapper().readValue<Map<String, String>>(request.body(),
                        object: TypeReference<Map<String, String>>() {})
                if(map["email"] == null || map["password"] == null)
                    throw NoFatalException("Requête Incorrecte");
                val user = userDao.getUserByEMail(map["email"]!!)
                val hash = hashPassword(user.salt,map["password"]!!)
                if(hash == user.password) {
                    response.cookie("email", user.email, 3600)
                    response.cookie("token", hash, 3600)
                    type("application/json")
                    "{\"email\":\"${user.email}\",\"token\":\"$hash\"}"
                }
                else
                    throw NoFatalException("")

            } catch (e: Exception) {
                e.printStackTrace()
                status(403)
                ObjectMapper().writeValueAsString(Message("Wrong e-mail or password !"))
            }
        }
        get("/logout"){
            try {
                response.cookie("email", "")
                response.cookie("token", "")
                response.removeCookie("email")
                response.removeCookie("token")
                status(200)
            }catch (e:Exception){
                status(500)
            }
        }
        get("/private"){
            val email = request.cookie("email")
            val token = request.cookie("token")

            if(email.isNullOrBlank() || token.isNullOrBlank())
                halt(401,ObjectMapper().writeValueAsString(Message("Not logged !")))

            val user = userDao.getUserByEMail(email)
            if(token != user.password)
                halt(401,ObjectMapper().writeValueAsString(Message("Not logged !")))

            ObjectMapper().writeValueAsString(Message("Welkome my bro !"))
        }
    }
}
