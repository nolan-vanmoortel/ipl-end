package controllers

import business.entities.MachineDto
import com.fasterxml.jackson.databind.ObjectMapper
import exceptions.NoFatalException
import persistence.dao.MachineDao
import spark.Spark.path
import spark.kotlin.get
import spark.kotlin.post
import util.Message
import business.factory.MachineFactory
import spark.Request
import util.*

fun MachineController(machineDao: MachineDao, machineFactory: MachineFactory){

}
