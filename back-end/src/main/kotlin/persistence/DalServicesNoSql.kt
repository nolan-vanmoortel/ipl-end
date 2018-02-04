package persistence

import com.mongodb.MongoClient
import com.mongodb.MongoClientURI
import com.mongodb.MongoCredential
import com.mongodb.ServerAddress
import com.mongodb.client.MongoCollection
import com.mongodb.client.MongoDatabase
import util.PluginProperties
import org.bson.Document
import java.util.*

const val USERS_COLLECTION = "Utilisateurs"

class DalServicesNoSql(private val properties: PluginProperties) : DalServices {

    private val connections = ThreadLocal<MongoDatabase>()
    private val mongo = MongoClient(MongoClientURI("mongodb://${properties.getProperty("dbUser")}:${properties.getProperty("dbPassword")}" +
            "@${properties.getProperty("dbUrl")}:${properties.getProperty("dbPort")}/${properties.getProperty("dbName")}"))
    /**
     * Create a connection to the database for the current poll if not already done.
     */
    private fun connect(): MongoDatabase {
        if(connections.get() == null) {
            val connection = mongo.getDatabase(properties.getProperty("dbName"))
            connections.set(connection)
            return connection
        }
        return connections.get()
    }

    /* Get the corresponding collection */
    override fun getCollection(string: String): MongoCollection<Document> {
        return connect().getCollection(string)
    }
}
