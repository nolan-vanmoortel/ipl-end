package tests.tests

import business.entities.impl.MachineImpl
import business.entities.impl.ReportImpl
import business.entities.impl.UserImpl
import business.factory.impl.MachineFactoryImpl
import business.factory.impl.ReportFactoryImpl
import business.factory.impl.UserFactoryImpl
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotEquals
import org.junit.jupiter.api.Test

object FactoryTest {

    private val machine1 = MachineImpl()
    private val machine2 = MachineImpl("id02", "ip02", "mac02", "name02", "comment02", "location02", false)

    private val report1 = ReportImpl()
    private val report2 = ReportImpl("id04", "date04", "mail04", "adminmail04", "comment04",0,0,0)

    private val user1 = UserImpl()
    private val user2 = UserImpl("id06","mail06","salt06","password06")

    @Test
    fun machineFactory_getMachineTest(){
        assertNotEquals(machine1, MachineFactoryImpl().getMachine("id02", "ip02", "mac02", "name02", "comment02", "location02", false))
        assertEquals(machine2, MachineFactoryImpl().getMachine("id02", "ip02", "mac02", "name02", "comment02", "location02", false))
    }

    @Test
    fun reportFactory_getReportTest(){
        assertNotEquals(report1, ReportFactoryImpl().getReport("id04", "date04", "mail04", "comment04", "adminmail04",0,0,0))
        assertEquals(report2, ReportFactoryImpl().getReport("id04", "date04", "mail04", "comment04", "adminmail04",0,0,0))
    }

    @Test
    fun userFactory_getUserTest(){
        assertNotEquals(user1, UserFactoryImpl().getUser("id06","mail06","salt06","password06"))
        assertEquals(user2, UserFactoryImpl().getUser("id06","mail06","salt06","password06"))
    }
}
