export const mockPatients = [
  {
    id: 1,
    name: 'Иванов Алексей Иванович',
    lastName: 'Иванов',
    firstName: 'Алексей',
    middleName: 'Иванович',
    birthDate: '15.03.2010',
    age: 14,
    startDate: '06.09.2025',
    treatmentStage: 'Основной',
    currentCap: 'Каппа №3',
    assignedCaps: '20 капп',
    changeCycle: '7 дней',
    capsCount: 20,
    nextVisit: '14:30 16.09.2025',
    avatar: '/patient-avatar.jpg',
    parentName: 'Иванова Мария Петровна',
    email: 'maria.ivanova@email.com',
    phone: '+375 (29) 123 45 67',
    treatmentType: 'Основной',
    status: 'active',
    notes: 'Особые примечания к пациенту',
    photo: null,
    parentData: {
      lastName: 'Иванова',
      firstName: 'Мария',
      middleName: 'Петровна',
      phone: '+375 (29) 123 45 67',
      email: 'maria.ivanova@email.com'
    },
    treatmentData: {
      treatmentType: 'main',
      capSystem: 'invisalign',
      capCount: '20',
      changeCycle: '7'
    },
    accountData: {
      accountType: 'child'
    }
  },
  {
    id: 2,
    name: 'Петров Дмитрий Сергеевич',
    lastName: 'Петров',
    firstName: 'Дмитрий',
    middleName: 'Сергеевич',
    birthDate: '22.07.2008',
    age: 16,
    startDate: '08.09.2025',
    treatmentStage: 'Премиум',
    currentCap: 'Каппа №5',
    assignedCaps: '25 капп',
    changeCycle: '10 дней',
    capsCount: 25,
    nextVisit: '16:00 18.09.2025',
    avatar: '/patient-avatar-2.jpg',
    parentName: 'Петрова Елена Владимировна',
    email: 'elena.petrova@email.com',
    phone: '+375 (29) 234 56 78',
    treatmentType: 'Премиум',
    status: 'active',
    notes: 'Пациент требует особого внимания',
    photo: null,
    parentData: {
      lastName: 'Петрова',
      firstName: 'Елена',
      middleName: 'Владимировна',
      phone: '+375 (29) 234 56 78',
      email: 'elena.petrova@email.com'
    },
    treatmentData: {
      treatmentType: 'premium',
      capSystem: 'clearalign',
      capCount: '25',
      changeCycle: '10'
    },
    accountData: {
      accountType: 'teen'
    }
  },
  {
    id: 3,
    name: 'Сидоров Антон Александрович',
    lastName: 'Сидоров',
    firstName: 'Антон',
    middleName: 'Александрович',
    birthDate: '10.12.2009',
    age: 15,
    startDate: '09.09.2025',
    treatmentStage: 'Экспресс',
    currentCap: 'Каппа №2',
    assignedCaps: '15 капп',
    changeCycle: '14 дней',
    capsCount: 15,
    nextVisit: 'Не назначено',
    avatar: '/patient-avatar-3.jpg',
    parentName: 'Сидорова Ольга Николаевна',
    email: 'olga.sidorova@email.com',
    phone: '+375 (29) 345 67 89',
    treatmentType: 'Экспресс',
    status: 'archived',
    notes: 'Быстрое лечение',
    photo: null,
    parentData: {
      lastName: 'Сидорова',
      firstName: 'Ольга',
      middleName: 'Николаевна',
      phone: '+375 (29) 345 67 89',
      email: 'olga.sidorova@email.com'
    },
    treatmentData: {
      treatmentType: 'express',
      capSystem: '3m',
      capCount: '15',
      changeCycle: '14'
    },
    accountData: {
      accountType: 'child'
    }
  }
]

export const mockVisits = [
  {
    id: 1,
    patientId: 1,
    date: '2024-01-15',
    time: '10:00',
    type: 'Консультация',
    status: 'completed',
    notes: 'Первичный осмотр, снятие слепков. Пациент хорошо переносит процедуру.',
    doctor: 'Доктор Смирнов',
    files: [
      { id: 1, name: 'scan_1.jpg', thumbnail: '/teeth.png' },
      { id: 2, name: 'scan_2.jpg', thumbnail: '/teeth.png' }
    ]
  },
  {
    id: 2,
    patientId: 1,
    date: '2024-01-22',
    time: '14:30',
    type: 'Установка капп',
    status: 'completed',
    notes: 'Установлена первая каппа, даны рекомендации по ношению. Пациент обучен правильному уходу.',
    doctor: 'Доктор Смирнов',
    files: [
      { id: 3, name: 'installation.jpg', thumbnail: '/teeth.png' }
    ]
  },
  {
    id: 3,
    patientId: 1,
    date: '2024-01-29',
    time: '11:15',
    type: 'Контрольный осмотр',
    status: 'completed',
    notes: 'Проверка прогресса лечения. Прогресс удовлетворительный, корректировка не требуется.',
    doctor: 'Доктор Смирнов',
    files: [
      { id: 4, name: 'progress_1.jpg', thumbnail: '/teeth.png' },
      { id: 5, name: 'progress_2.jpg', thumbnail: '/teeth.png' }
    ]
  }
]

export const mockNotes = [
  {
    id: 1,
    patientId: 1,
    date: '2024-01-15',
    text: 'Пациент хорошо переносит лечение. Рекомендуется носить каппы 22 часа в сутки.',
    author: 'Доктор Смирнов'
  },
  {
    id: 2,
    patientId: 1,
    date: '2024-01-20',
    text: 'Родители сообщили о небольшом дискомфорте в первые дни. Это нормальная реакция.',
    author: 'Доктор Смирнов'
  }
]

export const mockAppointments = [
  {
    id: 1,
    patientId: 1,
    date: '2024-02-05',
    time: '10:00',
    type: 'Контрольный осмотр',
    status: 'scheduled'
  },
  {
    id: 2,
    patientId: 1,
    date: '2024-02-12',
    time: '14:30',
    type: 'Смена капп',
    status: 'scheduled'
  }
]

export const getPatientById = (id) => {
  return mockPatients.find(patient => patient.id === parseInt(id))
}

export const getPatientsByStatus = (status) => {
  return mockPatients.filter(patient => patient.status === status)
}

export const getVisitsByPatientId = (patientId) => {
  return mockVisits.filter(visit => visit.patientId === parseInt(patientId))
}

export const getNotesByPatientId = (patientId) => {
  return mockNotes.filter(note => note.patientId === parseInt(patientId))
}

export const getAppointmentsByPatientId = (patientId) => {
  return mockAppointments.filter(appointment => appointment.patientId === parseInt(patientId))
}


export const additionalNotes = [
  {
    id: 1,
    text: 'Брекеты 2016-2018, удалены зубы мудрости.'
  },
  {
    id: 2,
    text: 'Аллергия на пенициллин. Требуется осторожность при назначении антибиотиков.'
  }
]

export const appData = {
  accountType: 'Детский',
  accountStatus: 'Активирован',
  generationDate: '11.09.2025'
}

export const visitCalendarData = [
  {
    id: 1,
    time: '14:30',
    date: '15 сентября',
    description: 'December 2017'
  },
  {
    id: 2,
    time: '13:45',
    date: '15 октября',
    description: 'December 2017'
  }
]


export const notifyParentOptions = ['Да', 'Нет']
export const notificationTypeOptions = ['Важно', 'Обычное']
export const visitTypes = ['Плановый', 'Срочный']

export const accountTypeOptions = [
  { value: 'child', label: 'Детский' },
  { value: 'teen', label: 'Подростковый' }
]

export const treatmentTypeOptions = [
  { value: 'basic', label: 'Основной' },
  { value: 'premium', label: 'Премиум' },
  { value: 'express', label: 'Экспресс' }
]

export const capSystemOptions = [
  { value: 'invisalign', label: 'Invisalign' },
  { value: 'clearalign', label: 'ClearAlign' },
  { value: '3m', label: '3M' }
]

export const capCountOptions = [
  { value: '10', label: '10 капп' },
  { value: '15', label: '15 капп' },
  { value: '20', label: '20 капп' },
  { value: '25', label: '25 капп' },
  { value: '30', label: '30 капп' }
]

export const changeCycleOptions = [
  { value: '7', label: '7 дней' },
  { value: '10', label: '10 дней' },
  { value: '14', label: '14 дней' }
]

export const scheduledVisits = [
  new Date(2025, 8, 10),
  new Date(2025, 8, 15),
  new Date(2025, 8, 20)
]

export const defaultFormData = {
  doctorComment: 'Заметно, что элайнеры носятся нерегулярно. Это замедляет лечение и может повлиять на результат. Важно соблюдать режим ношения, чтобы терапия проходила эффективно.',
  newDate: '25.10.2016',
  selectedDate: '25.10.2016',
  currentDate: new Date(2025, 8, 6)
}
