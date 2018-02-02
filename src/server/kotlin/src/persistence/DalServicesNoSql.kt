package persistence

import com.mongodb.MongoClient
import com.mongodb.client.MongoCollection
import com.mongodb.client.MongoDatabase
import ihm.PluginProperties
import org.bson.Document

const val USERS_COLLECTION = "Utilisateurs"

class DalServicesNoSql(private val properties: PluginProperties) : DalServices {

    private val connections = ThreadLocal<MongoDatabase>()
    private val mongo: MongoClient = MongoClient(properties.getProperty("dbUrl"),
            Integer.parseInt(properties.getProperty("dbPort")))

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
