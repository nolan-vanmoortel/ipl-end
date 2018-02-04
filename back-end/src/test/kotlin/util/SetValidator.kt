package tests.util

import java.lang.Thread.*
import kotlin.collections.HashSet

abstract class SetValidator {

    // Contains the expected methods calls of a test
    private val expectedMethodCalls = HashSet<String>()
    // Contains the method called during a test
    private val receivedMethodCalls = HashSet<String>()
    private val callerMethodIndex = 2


    /**
     *
     * Adds the method to the receivedMethodCalls. That means that the method as been called from
     * the object.
     */
    fun addCurrentMethodToSet() {
        receivedMethodCalls.add(currentThread().stackTrace[callerMethodIndex].methodName)
    }

    /**
     *
     * @return true if all expected method calls were received. false if any of the expected calls was not received.
     */
    fun validate(): Boolean {
        return receivedMethodCalls.containsAll(expectedMethodCalls)
    }

    fun addMethodToExpect(string: String): SetValidator {
        expectedMethodCalls.add(string)
        return this
    }
}
