package controllers

import com.fasterxml.jackson.databind.ObjectMapper
import exceptions.NoFatalException
import spark.Spark.path
import spark.kotlin.get
import ucc.UserUcc
import util.Message

fun UserController(userUcc: UserUcc){
    path("/users") {
        get("/:id") {
            try {
                ObjectMapper().writeValueAsString(userUcc.getUserById(Integer.parseInt(request.params("id"))))
            } catch (e: NoFatalException) {
                status(404)
                ObjectMapper().writeValueAsString(Message("Pas d'utilisateur connu pour cet Id"))
            }
        }
    }
}
