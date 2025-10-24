import { ref, computed } from 'vue'
import { 
  mockPatients, 
  mockVisits, 
  mockNotes, 
  mockAppointments,
  getPatientById,
  getPatientsByStatus,
  getVisitsByPatientId,
  getNotesByPatientId,
  getAppointmentsByPatientId
} from '../data/mockData'

const patients = ref([...mockPatients])
const visits = ref([...mockVisits])
const notes = ref([...mockNotes])
const appointments = ref([...mockAppointments])

export function usePatients() {
  const getAllPatients = () => {
    return patients.value
  }

  const getActivePatients = () => {
    return getPatientsByStatus('active')
  }

  const getArchivedPatients = () => {
    return getPatientsByStatus('archived')
  }

  const getPatient = (id) => {
    return getPatientById(id)
  }

  const createPatient = (patientData) => {
    const newPatient = {
      id: Math.max(...patients.value.map(p => p.id)) + 1,
      ...patientData,
      status: 'active',
      avatar: patientData.photo ? URL.createObjectURL(patientData.photo) : '/patient-avatar.jpg'
    }
    patients.value.push(newPatient)
    return newPatient
  }

  const updatePatient = (id, updatedData) => {
    const index = patients.value.findIndex(p => p.id === parseInt(id))
    if (index !== -1) {
      patients.value[index] = {
        ...patients.value[index],
        ...updatedData,
        avatar: updatedData.photo ? URL.createObjectURL(updatedData.photo) : patients.value[index].avatar
      }
      return patients.value[index]
    }
    return null
  }

  const archivePatient = (id) => {
    const index = patients.value.findIndex(p => p.id === parseInt(id))
    if (index !== -1) {
      patients.value[index].status = 'archived'
      return patients.value[index]
    }
    return null
  }

  const restorePatient = (id) => {
    const index = patients.value.findIndex(p => p.id === parseInt(id))
    if (index !== -1) {
      patients.value[index].status = 'active'
      return patients.value[index]
    }
    return null
  }

  const getPatientVisits = (patientId) => {
    return getVisitsByPatientId(patientId)
  }

  const getPatientNotes = (patientId) => {
    return getNotesByPatientId(patientId)
  }

  const getPatientAppointments = (patientId) => {
    return getAppointmentsByPatientId(patientId)
  }

  const addVisit = (visitData) => {
    const newVisit = {
      id: Math.max(...visits.value.map(v => v.id)) + 1,
      ...visitData
    }
    visits.value.push(newVisit)
    return newVisit
  }

  const addNote = (noteData) => {
    const newNote = {
      id: Math.max(...notes.value.map(n => n.id)) + 1,
      ...noteData
    }
    notes.value.push(newNote)
    return newNote
  }

  const addAppointment = (appointmentData) => {
    const newAppointment = {
      id: Math.max(...appointments.value.map(a => a.id)) + 1,
      ...appointmentData
    }
    appointments.value.push(newAppointment)
    return newAppointment
  }

  const searchPatients = (query) => {
    if (!query.trim()) return patients.value
    
    const lowercaseQuery = query.toLowerCase()
    return patients.value.filter(patient => 
      patient.name.toLowerCase().includes(lowercaseQuery) ||
      patient.parentName.toLowerCase().includes(lowercaseQuery) ||
      patient.phone.includes(query) ||
      patient.email.toLowerCase().includes(lowercaseQuery)
    )
  }

  const activePatientsCount = computed(() => 
    patients.value.filter(p => p.status === 'active').length
  )

  const archivedPatientsCount = computed(() => 
    patients.value.filter(p => p.status === 'archived').length
  )

  return {
    patients: computed(() => patients.value),
    visits: computed(() => visits.value),
    notes: computed(() => notes.value),
    appointments: computed(() => appointments.value),
    
    getAllPatients,
    getActivePatients,
    getArchivedPatients,
    getPatient,
    getPatientVisits,
    getPatientNotes,
    getPatientAppointments,
    
    createPatient,
    updatePatient,
    archivePatient,
    restorePatient,
    addVisit,
    addNote,
    addAppointment,
    
    searchPatients,
    
    activePatientsCount,
    archivedPatientsCount
  }
}
