package persistence.dao.impl

import business.entities.ReportDto
import business.entities.ReportReal
import business.factory.MachineFactory
import business.factory.ReportFactory
import com.fasterxml.jackson.databind.ObjectMapper
import com.mongodb.client.model.Filters.eq
import exceptions.NoFatalException
import org.bson.Document
import org.bson.types.ObjectId
import persistence.DalServices
import persistence.dao.ReportDao
import util.PluginProperties
import java.time.LocalDateTime

/**
 * Implementation of ReportDao.
 */
class ReportDaoImpl(private val dal: DalServices,
                    private val reportFactory: ReportFactory,
                    private val machineFactory: MachineFactory,
                    private val properties: PluginProperties): ReportDao {

    override fun updateState(name: String, report: ReportDto, state: Int) {
        val machine = machineFactory.getMachine(dal.getCollection(properties.getProperty("MACHINES_COLLECTION"))
                .find(Document("name", name)).first()
                ?: throw NoFatalException("find(Document(\"name\",name) failed"))
        val reports = machine.reports.filter { any -> ((any as Document).get("date")) == report.date }
    }

    override fun save(name: String, report: ReportDto) {
        dal.getCollection(properties.getProperty("MACHINES_COLLECTION"))
                .updateOne(eq("name", name),
                        Document("\$push", Document("reports",
                                Document.parse(ObjectMapper().writeValueAsString(report)))))
    }

    override fun getReportById(id: String): ReportReal {
        val report = dal.getCollection(properties.getProperty("MACHINES_COLLECTION"))
                .find(Document("_id", ObjectId(id))).first()
                ?: throw NoFatalException("getReportById failed !")
        return reportFactory.getReport(report) as ReportReal
    }

    override fun getReportByDate(date: String): ReportReal {
        val report = dal.getCollection(properties.getProperty("MACHINES_COLLECTION"))
                .find(Document("date", date)).first()
                ?: throw NoFatalException("getReportByEMail failed !")
        return reportFactory.getReport(report) as ReportReal
    }
}
