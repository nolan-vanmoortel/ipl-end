package util

object Util {

    /**
     * Check a string.
     * @param string the string to be checked.
     * @throw IllegalArgumentException if the string is not valid.
     */
    fun checkString(string: String) {
        if(string.isEmpty())
            throw IllegalArgumentException("A string cannot be empty")
    }

    /**
     * Check that integer have a positive value.
     */
    fun checkPositiveInteger(integer: Int) {
        if(integer < 0)
            throw IllegalArgumentException("The integer have an negative value")
    }

    /**
     * Check that integer have a negative value.
     */
    fun checkNegativeInteger(integer: Int) {
        if(integer > 0)
            throw IllegalArgumentException("The integer have a positive value")
    }
}