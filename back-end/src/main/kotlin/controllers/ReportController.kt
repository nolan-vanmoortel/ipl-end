package controllers

import business.entities.DEFAULT_TYPE
import business.entities.MINOR_SEVERITY
import business.entities.ReportDto
import com.fasterxml.jackson.databind.ObjectMapper
import exceptions.NoFatalException
import persistence.dao.ReportDao
import spark.Spark.path
import spark.kotlin.get
import spark.kotlin.post
import util.Message
import business.factory.ReportFactory
import com.fasterxml.jackson.core.type.TypeReference
import org.owasp.html.PolicyFactory
import org.owasp.html.Sanitizers
import policy
import spark.Request
import util.*
import java.time.LocalDateTime

fun ReportController(reportDao: ReportDao, reportFactory: ReportFactory){
    path("/reports") {
        post("/create"){
            try {
                val map = ObjectMapper().readValue<Map<String, String>>(request.body(),object: TypeReference<Map<String, String>>() {})
                if(map["email"] == null || map["modele"] == null || map["severity"] == null
                        || map["type"] == null || map["machine"] == null)
                    throw NoFatalException("Requête Incorrecte")
                val report: ReportDto = reportFactory.getReport(
                        date= LocalDateTime.now(),
                        email= policy.sanitize(map["email"]),
                        comment= policy.sanitize(map["modele"]),
                        severity = Integer.parseInt(policy.sanitize(map["severity"])),
                        type = Integer.parseInt(policy.sanitize(map["type"])))
                status(200)
                reportDao.save(policy.sanitize(map["machine"]), report)
                ObjectMapper().writeValueAsString(
                        Message("Report correctement enregistré"))
            } catch(e: Exception) {
                e.printStackTrace()
                status(400)
                ObjectMapper().writeValueAsString(Message(""+e.message))
            }
        }
    }
}
