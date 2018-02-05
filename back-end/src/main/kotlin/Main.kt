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

private fun handler(userDao: UserDao, userFactory: UserFactory, machineDao : MachineDao, machineFactory: MachineFactory, reportDao: ReportDao, reportFactory: ReportFactory) {
    UserController(userDao, userFactory)
    AuthController(userDao, userFactory)
    MachineController(machineDao, machineFactory)
    ReportController(reportDao, reportFactory)
}
