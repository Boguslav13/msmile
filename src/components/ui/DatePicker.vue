<template>
  <div class="date-picker">
    <!-- Header -->
    <div class="date-picker-header">
      <button @click="prevMonth" class="nav-button nav-button-left">
        <img src="/ui/nav_button_left.svg" alt="Previous" class="nav-icon" />
      </button>
      <div class="month">{{ monthName }}</div>
      <button @click="nextMonth" class="nav-button nav-button-right">
        <img src="/ui/nav_button_right.svg" alt="Next" class="nav-icon" />
      </button>
      <div class="year-selector" @click="toggleYearDropdown">
        <span class="year">{{ year }}</span>
        <img 
          :src="showYearDropdown ? '/ui/nav_button_left.svg' : '/ui/nav_button_right.svg'" 
          alt="Dropdown" 
          class="dropdown-icon" 
        />
        
        <!-- Year Dropdown Menu -->
        <div v-if="showYearDropdown" class="year-dropdown">
          <div class="year-option" @click="selectYear(year - 1)">{{ year - 1 }}</div>
          <div class="year-option" @click="selectYear(year)">{{ year }}</div>
          <div class="year-option" @click="selectYear(year + 1)">{{ year + 1 }}</div>
        </div>
      </div>
    </div>

    <!-- Weekdays -->
    <div class="weekdays">
      <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
    </div>

    <!-- Days -->
    <div class="days-grid">
      <div
        v-for="(day, index) in days"
        :key="index"
        :class="[
          'day',
          day.isCurrentMonth
            ? day.isSelected
              ? 'selected'
              : 'current-month'
            : 'other-month',
          day.isToday ? 'today' : '',
          day.isScheduled ? 'scheduled' : ''
        ]"
        @click="selectDay(day)"
      >
        {{ day.date }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(['date-selected'])

const currentDate = ref(new Date());
import { defaultFormData } from '../../data/mockData'
const selectedDate = ref(defaultFormData.currentDate)
const showYearDropdown = ref(false)

import { scheduledVisits as mockScheduledVisits } from '../../data/mockData'
const scheduledVisits = ref([...mockScheduledVisits])

const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const year = computed(() => currentDate.value.getFullYear());
const month = computed(() => currentDate.value.getMonth());

const monthName = computed(() =>
  currentDate.value.toLocaleString("ru-RU", { month: "long" })
);

const days = computed(() => {
  const start = new Date(year.value, month.value, 1);
  const end = new Date(year.value, month.value + 1, 0);

  const startDay = (start.getDay() + 6) % 7; // сдвиг, чтобы Пн был первым
  const totalDays = end.getDate();

  const prevMonthDays = [];
  for (let i = startDay - 1; i >= 0; i--) {
    const date = new Date(year.value, month.value, -i);
    prevMonthDays.push({ date: date.getDate(), isCurrentMonth: false });
  }

  const currentMonthDays = Array.from({ length: totalDays }, (_, i) => {
    const dateObj = new Date(year.value, month.value, i + 1);
    const today = new Date();
    const isToday = dateObj.toDateString() === today.toDateString();
    const isScheduled = scheduledVisits.value.some(visit => 
      visit.toDateString() === dateObj.toDateString()
    );
    
    return {
      date: i + 1,
      isCurrentMonth: true,
      isSelected: selectedDate.value.toDateString() === dateObj.toDateString(),
      isToday: isToday,
      isScheduled: isScheduled,
    };
  });

  const nextMonthDaysCount =
    42 - (prevMonthDays.length + currentMonthDays.length);
  const nextMonthDays = Array.from({ length: nextMonthDaysCount }, (_, i) => ({
    date: i + 1,
    isCurrentMonth: false,
  }));

  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
});

function prevMonth() {
  currentDate.value = new Date(year.value, month.value - 1, 1);
}

function nextMonth() {
  currentDate.value = new Date(year.value, month.value + 1, 1);
}

function selectDay(day) {
  if (!day.isCurrentMonth) return;
  selectedDate.value = new Date(year.value, month.value, day.date);
  emit('date-selected', selectedDate.value);
}

function toggleYearDropdown() {
  showYearDropdown.value = !showYearDropdown.value;
}

function selectYear(selectedYear) {
  currentDate.value = new Date(selectedYear, month.value, 1);
  showYearDropdown.value = false;
}
</script>

<style scoped>
.date-picker {
  width: 320px;
  background: white;
  border-radius: 16px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  padding: 16px;
}

.date-picker-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 8px;
}

.nav-button {
  width: 32px;
  height: 32px;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.nav-button-left,
.nav-button-right {
  background: #F7F8FC;
}

.nav-button:hover {
  opacity: 0.8;
}

.nav-icon {
  width: 9px;
  height: 14px;
}

.month {
  font-weight: 600;
  font-size: 18px;
  color: #1F2937;
  text-align: center;
  flex: 1;
}

.year-selector {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 6px;
  gap: 4px;
  background: #F7F8FC;
  border-radius: 12px;
  height: 30px;
  width: 55px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.year-selector:hover {
  background: #e5e7eb;
}

.year {
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: #6B7897;
  display: flex;
  align-items: flex-end;
  width: 39px;
  height: 22px;
}

.dropdown-icon {
  width: 9px;
  height: 14px;
  transform: rotate(90deg);
  transition: all 0.2s;
}

.year-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 67px;
  background: #F7F8FC;
  border-radius: 12px;
  padding: 4px 6px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  margin-top: 4px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.year-option {
  width: 39px;
  height: 22px;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: #6B7897;
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  padding: 2px 0;
  transition: background-color 0.2s;
}

.year-option:hover {
  background: #e5e7eb;
  border-radius: 6px;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: #8C96AB;
  margin-bottom: 8px;
}

.weekday {
  padding: 8px 0;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.day {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  margin: 0 auto;
}

.current-month {
  color: #1F2937;
}

.current-month:hover {
  background: #f3f4f6;
}

.other-month {
  color: #C3C3C3;
}

.selected {
  background: #FCC929;
  color: white;
  font-weight: 600;
}

.today {
  background: #FFB000;
  color: white;
  font-weight: 600;
}

.scheduled {
  border: 1px solid #FFB000;
  color: #1F2937;
  font-weight: 500;
}
</style>
