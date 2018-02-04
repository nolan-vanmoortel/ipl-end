package controllers

import business.factory.UserFactory
import com.fasterxml.jackson.databind.ObjectMapper
import exceptions.NoFatalException
import persistence.dao.UserDao
import spark.Spark.path
import spark.kotlin.before
import spark.kotlin.get
import spark.kotlin.post
import util.Message
import util.getSalt
import util.hashPassword
import util.isPasswordCorrect

fun AuthController(userDao: UserDao, userFactory: UserFactory){
    path("/auth") {
        post("/login") {
            val salt = getSalt()
            try {
                val user = userDao.getUserByEMail(request.qp("email"))
                if(isPasswordCorrect(request.qp("password"), user.salt, user.password))
                    ObjectMapper().writeValueAsString(user)
                else
                    throw NoFatalException("")

            } catch (e: NoFatalException) {
                ObjectMapper().writeValueAsString(Message("Wrong e-mail or password !"))
            }
        }
    }
}
