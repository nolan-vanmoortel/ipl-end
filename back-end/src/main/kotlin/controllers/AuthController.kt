package controllers

import business.factory.UserFactory
import com.fasterxml.jackson.databind.ObjectMapper
import exceptions.NoFatalException
import persistence.dao.UserDao
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
                val user = userDao.getUserByEMail(request.qp("email"))
                val hash = hashPassword(user.salt,request.qp("password"))

                if(hash == user.password) {
                    response.cookie("email", user.email, 3600)
                    response.cookie("token", hash, 3600)
                    ObjectMapper().writeValueAsString(user)
                }
                else
                    throw NoFatalException("")

            } catch (e: NoFatalException) {
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
