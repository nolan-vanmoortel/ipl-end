package controllers

import business.entities.UserDto
import com.fasterxml.jackson.databind.ObjectMapper
import exceptions.NoFatalException
import persistence.dao.UserDao
import spark.Spark.path
import spark.kotlin.get
import spark.kotlin.post
import util.Message
import business.factory.UserFactory
import spark.Request
import util.*

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
        post("/create"){
            val salt = getSalt()
            try {
                val user = userFactory.getUser(email = request.qp("email"), password = hashPassword(salt, request.qp("password")), salt = salt)
                ObjectMapper().writeValueAsString(Message(userDao.save(user).id))
            }catch (e: Exception){
                ObjectMapper().writeValueAsString(Message(""+e.message))
            }
        }
    }
}
fun Request.qp(key: String): String = this.queryParams(key)
