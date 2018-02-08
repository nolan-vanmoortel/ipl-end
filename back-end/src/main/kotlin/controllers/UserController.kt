package controllers

import business.factory.UserFactory
import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import exceptions.NoFatalException
import persistence.dao.UserDao
import spark.Request
import spark.Spark.path
import spark.kotlin.get
import spark.kotlin.post
import util.Message
import util.getSalt
import util.hashPassword

fun UserController(userDao: UserDao, userFactory: UserFactory){
    path("/users") {
        get("/:id") {
            try {
                ObjectMapper().writeValueAsString(userDao.getUserById(request.params("id")))
            } catch (e: NoFatalException) {
                status(404)
                ObjectMapper().writeValueAsString(Message("Pas d'utilisateur connu pour cet Id"))
            }
        }
    }
}
fun Request.qp(key: String): String = this.queryParams(key)
