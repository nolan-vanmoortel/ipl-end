package exceptions

/**
 * Don't try to catch me => I'm not born for that
 */
class FatalException: RuntimeException {
    constructor(message: String): super(message)
    constructor(e: Exception): super(e)
}
