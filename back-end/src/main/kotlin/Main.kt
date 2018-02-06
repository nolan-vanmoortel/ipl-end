import business.factory.MachineFactory
import business.factory.ReportFactory
import business.factory.UserFactory
import business.factory.impl.MachineFactoryImpl
import business.factory.impl.ReportFactoryImpl
import business.factory.impl.UserFactoryImpl
import controllers.AuthController
import controllers.MachineController
import controllers.ReportController
import controllers.UserController
import exceptions.FatalException
import persistence.DalServicesNoSql
import persistence.dao.MachineDao
import persistence.dao.ReportDao
import persistence.dao.UserDao
import persistence.dao.impl.MachineDaoImpl
import persistence.dao.impl.ReportDaoImpl
import persistence.dao.impl.UserDaoImpl
import spark.kotlin.before
import spark.kotlin.options
import spark.kotlin.port
import util.PluginProperties


fun main(args: Array<String>) {

    try {
        val properties = setEnvironment(args)
        val dalServices = DalServicesNoSql(properties)
        val userFactory = UserFactoryImpl()
        val userDao = UserDaoImpl(dalServices, userFactory)
        val machineFactory = MachineFactoryImpl()
        val machineDao = MachineDaoImpl(dalServices, machineFactory)
        val reportFactory = ReportFactoryImpl()
        val reportDao = ReportDaoImpl(dalServices, reportFactory)
        port(8080)
        handler(userDao, userFactory, machineDao, machineFactory, reportDao, reportFactory)
    } catch (e: FatalException) {
        println(e)
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

private fun enableCORS(origin: String) {

    options("/*") {

        val accessControlRequestHeaders = request.headers("Access-Control-Request-Headers")
        if (accessControlRequestHeaders != null) {
            response.header("Access-Control-Allow-Headers", accessControlRequestHeaders)
        }

        val accessControlRequestMethod = request.headers("Access-Control-Request-Method")
        if (accessControlRequestMethod != null) {
            response.header("Access-Control-Allow-Methods", accessControlRequestMethod)
        }

        "OK"
    }

    before {
        response.header("Access-Control-Allow-Origin", origin)
        response.header("Access-Control-Allow-Credentials", "true")
        response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
        response.header("Access-Control-Allow-Headers", "Content-Type,Authorization,X-Requested-With,Content-Length,Accept,Origin,")

        // Note: this may or may not be necessary in your particular application
        response.type("application/json")
    }
}

private fun handler(userDao: UserDao, userFactory: UserFactory, machineDao : MachineDao, machineFactory: MachineFactory, reportDao: ReportDao, reportFactory: ReportFactory) {
    enableCORS("http://localhost:3001")
    UserController(userDao, userFactory)
    AuthController(userDao, userFactory)
    MachineController(machineDao, machineFactory)
    ReportController(reportDao, reportFactory)
}
