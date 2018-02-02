package ihm

import business.factory.implementations.UserFactoryImpl
import com.mongodb.util.JSON
import exceptions.FatalException
import exceptions.NoFatalException
import persistence.DalServicesNoSql
import persistence.dao.UserDaoImpl
import ucc.UserUccImpl
import spark.kotlin.*
import ucc.UserUcc
import util.Message

fun main(args: Array<String>) {

    try {
        val properties = setEnvironment(args)
        val dalServices = DalServicesNoSql(properties)
        val userFactory = UserFactoryImpl()
        val userDao = UserDaoImpl(dalServices, userFactory)
        val userUcc = UserUccImpl(userDao)
        handler(userUcc)
    } catch (e: FatalException) {
        println("Ceci n'est jamais censé se produire")
    }
}

/**
 * Allow to set the correct environment in a small amout of work/time.
 */
private fun setEnvironment(args: Array<String>): PluginProperties {
    return if(args.isEmpty())
        PluginProperties("src/server/kotlin/src/ihm/config/prod.properties")
    else
        PluginProperties("src/server/kotlin/src/ihm/config/${args[0]}.properties")
}

private fun handler(userUcc: UserUcc) {
  get("/getUserById/:id") {
    try {
      val user = userUcc.getUserById(Integer.parseInt(request.params("id")))
      status(200)
      response.body(JSON.serialize(user))
    } catch (e: NoFatalException) {
      status(400)
      response.body(JSON.serialize(Message("Pas d'utilisateur connu pour cet Id")))
    }
  }
}
