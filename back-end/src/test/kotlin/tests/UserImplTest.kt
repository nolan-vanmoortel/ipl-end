package tests.tests

import business.entities.impl.UserImpl
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

object UserImplTest {

    private val user1 = UserImpl()
    private val user2 = UserImpl("Doe", "John")
}
