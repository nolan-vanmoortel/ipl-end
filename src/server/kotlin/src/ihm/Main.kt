package ihm

import business.factory.implementations.UserFactoryImpl
import exceptions.FatalException
import exceptions.NoFatalException
import persistence.DalServicesNoSql
import persistence.dao.UserDaoImpl
import ucc.UserUccImpl
import spark.kotlin.*

fun main(args: Array<String>) {
    try {
        val properties = setEnvironment(args)
        val dalServices = DalServicesNoSql(properties)
        val userFactory = UserFactoryImpl()
        val userDao = UserDaoImpl(dalServices, userFactory)
        val userUcc = UserUccImpl(userDao)
        handler()
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

private fun handler() {
  get("/hello") {
    try {
      "Hello Static Spark Kotlin"
    } catch (e: NoFatalException) {
      println("NoFatalException thrown")
    }

  }
}
