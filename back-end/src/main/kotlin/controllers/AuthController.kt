package controllers

import business.factory.ReportFactory
import business.factory.UserFactory
import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import exceptions.NoFatalException
import persistence.dao.MachineDao
import persistence.dao.ReportDao
import persistence.dao.UserDao
import spark.Request
import spark.Spark.path
import spark.kotlin.before
import spark.kotlin.get
import spark.kotlin.halt
import spark.kotlin.post
import util.Message
import util.getSalt
import util.hashPassword
import java.time.LocalDateTime

fun AuthController(userDao: UserDao,
                   userFactory: UserFactory,
                   reportFactory: ReportFactory,
                   reportDao: ReportDao,
                   machineDao: MachineDao){
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
            checkCookie(request, userDao)
            ObjectMapper().writeValueAsString(Message("Welkome my bro !"))
        }
        get("/update/state/:machine/:date/:state") {
            checkCookie(request, userDao)
            try {
                val report = request.params("date")
                val state = Integer.parseInt(request.params("state"))
                val machine = request.params("machine")
                if(state != 0 && state != 1 && state != 2)
                    throw NoFatalException("Incorrect State")
                reportDao.updateState(machine, report, state)
                status(200)
                ObjectMapper().writeValueAsString(Message("Report sucessfully updated"))
            } catch (e: NoFatalException) {
                e.printStackTrace()
                status(403)
                ObjectMapper().writeValueAsString(Message("Wrong e-mail or password !"))

            }
        }
        get("/update/admin/:machine/:date/:admin") {
            checkCookie(request, userDao)
            try {
                val date = request.params("date")
                val admin = request.params("admin")
                val machine = request.params("machine")
                reportDao.updateAdmin(machine, date, admin)
                status(200)
                ObjectMapper().writeValueAsString(Message("Report sucessfully updated"))
            } catch (e: NoFatalException) {
                e.printStackTrace()
                status(403)
                ObjectMapper().writeValueAsString(Message("Wrong e-mail or password !"))
            }
        }
        get("/update/admin/:machine/:state") {
            checkCookie(request, userDao)
            try {
                val machine = request.params("machine")
                val state = request.params("state").toBoolean()
                machineDao.switchMachineState(machine,state)
                status(200)
                ObjectMapper().writeValueAsString(Message("Machine state successfully updated"))
            } catch (e: NoFatalException) {
                e.printStackTrace()
                status(403)
                ObjectMapper().writeValueAsString(Message("Wrong e-mail or password !"))
            }
        }
        get("/users") {
            checkCookie(request, userDao)
            try {
                ObjectMapper().writeValueAsString(userDao.getAllUsers())
            } catch (e:Exception) {
                println(e.message)
                ObjectMapper().writeValueAsString(Message("An error occured"))
            }
        }
    }
}

private fun checkCookie(request: Request, userDao: UserDao) {
    val email = request.cookie("email")
    val token = request.cookie("token")

    if(email.isNullOrBlank() || token.isNullOrBlank())
        halt(401,ObjectMapper().writeValueAsString(Message("Not logged !")))

    val user = userDao.getUserByEMail(email)
    if(token != user.password)
        halt(401,ObjectMapper().writeValueAsString(Message("Not logged !")))
}
