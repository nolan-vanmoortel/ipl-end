package tests.tests

import business.entities.implementations.UserImpl
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

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
        assertEquals(user1.firstName, "")
        assertEquals(user2.firstName, "John")
    }
}