<template>
  <div class="card password-card">
    <div class="card-title">Смена пароля</div>

    <div class="fields">
      <div class="field-group">
        <label class="field-label">Введите старый пароль</label>
        <input type="password" class="field-input" />
      </div>

      <div class="field-group">
        <label class="field-label">Введите новый пароль</label>
        <input type="password" class="field-input" />
      </div>

      <div class="field-group">
        <label class="field-label">Повторите новый пароль</label>
        <input type="password" class="field-input" />
      </div>
    </div>

    <div class="card-actions">
      <button class="btn btn-primary">Сохранить</button>
      <button class="btn btn-secondary">Отменить</button>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.card.password-card {
  width: 440px;
  background: #F7F7F7;
  border-radius: 24px;
  margin-top: 100px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.card-title {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  letter-spacing: 0.005em;
  color: #1F2937;
  text-align: center;
  margin-bottom: 24px;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  align-items: center;
  letter-spacing: 0.005em;
  color: #1F2937;
}

.field-input {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 12px;
  width: 392px;
  height: 43px;
  background: #FFFFFF;
  border: 1px solid #A9CFF5;
  border-radius: 44.5px;
}

.card-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
}

.btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  gap: 4px;
  height: 35px;
  border-radius: 44px;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.005em;
  white-space: nowrap;
}

.btn-primary {
  width: 111px;
  background: #3B7AB8;
  color: #FFFFFF;
  border: none;
}

.btn-secondary {
  width: 105px;
  background: #FFFFFF;
  color: #104D89;
  border: 1px solid #104D89;
}
</style>


