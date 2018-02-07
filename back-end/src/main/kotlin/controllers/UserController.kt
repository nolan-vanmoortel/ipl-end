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
        post("/create"){
            val salt = getSalt()
            try {
                val map = ObjectMapper().readValue<Map<String, String>>(request.body(),object: TypeReference<Map<String, String>>() {})
                if(map["email"] == null || map["password"] == null)
                    throw NoFatalException("Requête Incorrecte")
                val user = userFactory.getUser(
                        email = map["email"]!!,
                        password = hashPassword(salt, map["password"]!!),
                        salt = salt)
                ObjectMapper().writeValueAsString(Message(userDao.save(user).id))
            }catch (e: Exception){
                ObjectMapper().writeValueAsString(Message(""+e.message))
            }
        }
    }
}
fun Request.qp(key: String): String = this.queryParams(key)
