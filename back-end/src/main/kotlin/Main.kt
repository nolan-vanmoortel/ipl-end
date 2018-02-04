import business.factory.impl.UserFactoryImpl
import controllers.UserController
import exceptions.FatalException
import persistence.DalServicesNoSql
import persistence.dao.impl.UserDaoImpl
import spark.kotlin.port
import ucc.impl.UserUccImpl
import ucc.UserUcc
import util.PluginProperties


fun main(args: Array<String>) {

    try {
        val properties = setEnvironment(args)
        val dalServices = DalServicesNoSql(properties)
        val userFactory = UserFactoryImpl()
        val userDao = UserDaoImpl(dalServices, userFactory)
        val userUcc = UserUccImpl(userDao)
        port(8080)
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
        PluginProperties(ClassLoader.getSystemResource("prod.properties").path)
    else
        PluginProperties(ClassLoader.getSystemResource("${args[0]}.properties").path)
}

private fun handler(userUcc: UserUcc) {
    UserController(userUcc)
}
