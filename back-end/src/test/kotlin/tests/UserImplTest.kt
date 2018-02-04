package tests.tests

import business.entities.impl.UserImpl
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

object UserImplTest {

    private val user1 = UserImpl()
    private val user2 = UserImpl("Doe", "John")

    @Test
    fun testName() {
        assertEquals(user1.name, "")
        assertEquals(user2.name, "Doe")
    }

    @Test
    fun testFirstName() {
        assertEquals(user1.firstname, "")
        assertEquals(user2.firstname, "John")
    }
}
