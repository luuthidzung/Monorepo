<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4 flex justify-center items-start">
    <div class="w-full max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 transition-all duration-300">
      <div class="bg-indigo-600 text-white p-6 text-center relative">
        <h1 class="text-2xl font-bold tracking-tight">To-Do App</h1>
      </div>

      <div class="p-7">
        <!-- Add Task Form -->
        <form @submit.prevent="addTask" class="mb-7 shadow-sm rounded-lg p-5 bg-white border border-gray-200">
          <div class="mb-4">
            <input
              v-model="newTask.text"
              type="text"
              placeholder="Thêm công việc mới..."
              required
              class="w-full py-3.5 px-5 border border-gray-200 rounded-lg text-base outline-none transition duration-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-20"
            />
          </div>
          <div class="flex flex-col md:flex-row gap-4 mb-4">
            <div class="flex items-center gap-2 flex-1">
              <label class="font-medium">Bắt đầu:</label>
              <input
                v-model="newTask.startDate"
                type="date"
                required
                class="p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-20"
              />
              <input
                v-model="newTask.startTime"
                type="time"
                required
                class="p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-20"
              />
            </div>
            <div class="flex items-center gap-2 flex-1">
              <label class="font-medium">Kết thúc:</label>
              <input
                v-model="newTask.endDate"
                type="date"
                required
                class="p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-20"
              />
              <input
                v-model="newTask.endTime"
                type="time"
                required
                class="p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-20"
              />
            </div>
          </div>
          <button type="submit" class="w-full bg-indigo-600 text-white py-3.5 px-6 rounded-lg cursor-pointer text-base font-medium transition duration-200 hover:bg-indigo-700">Thêm</button>
        </form>

        <!-- View Controls -->
        <div class="flex justify-end mb-5">
          <div class="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
              @click="currentView = 'list'"
              :class="{ 'bg-indigo-600 text-white': currentView === 'list', 'bg-white hover:bg-gray-100': currentView !== 'list' }"
              class="p-2 transition duration-200"
              aria-label="Xem dạng danh sách">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              @click="currentView = 'table'"
              :class="{ 'bg-indigo-600 text-white': currentView === 'table', 'bg-white hover:bg-gray-100': currentView !== 'table' }"
              class="p-2 transition duration-200"
              aria-label="Xem dạng bảng">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18M3 6h18M3 18h18" />
              </svg>
            </button>
            <button
              @click="currentView = 'grid'"
              :class="{ 'bg-indigo-600 text-white': currentView === 'grid', 'bg-white hover:bg-gray-100': currentView !== 'grid' }"
              class="p-2 transition duration-200"
              aria-label="Xem dạng lưới">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- List View -->
        <div v-if="currentView === 'list' && tasks.length > 0" class="flex flex-col gap-3.5">
          <div
            v-for="(task, index) in tasks"
            :key="index"
            class="flex items-start justify-between p-4 border border-gray-200 rounded-lg bg-white transition duration-200 hover:shadow hover:-translate-y-0.5 animate-fadeIn"
            :class="{ 'bg-gray-50 bg-opacity-50': task.completed && !task.isEditing }"
          >
            <!-- View Mode -->
            <div v-if="!task.isEditing" class="flex items-start gap-3.5 flex-grow">
              <input
                type="checkbox"
                :checked="task.completed"
                @change="toggleTask(index)"
                class="w-5 h-5 mt-1 cursor-pointer accent-indigo-600"
              />
              <div class="flex flex-col gap-1">
                <span class="text-base font-medium transition duration-200" :class="{ 'line-through text-gray-500': task.completed }">
                  {{ task.text }}
                </span>
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <span class="font-medium">Bắt đầu:</span>
                  <span>{{ formatDateTime(task.startDate, task.startTime) }}</span>
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <span class="font-medium">Kết thúc:</span>
                  <span>{{ formatDateTime(task.endDate, task.endTime) }}</span>
                </div>
              </div>
            </div>

            <!-- Edit Mode -->
            <div v-else class="flex-grow flex flex-col gap-4">
              <div class="w-full">
                <input
                  v-model="editingTask.text"
                  type="text"
                  class="w-full py-2.5 px-3.5 border border-gray-200 rounded-lg text-base outline-none transition duration-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-20 mb-2"
                  @keyup.enter="updateTask(index)"
                  @keyup.esc="cancelEdit()"
                  ref="editInput"
                />
                <div class="flex flex-col md:flex-row gap-3">
                  <div class="flex items-center gap-2 flex-1">
                    <label class="font-medium">Bắt đầu:</label>
                    <input
                      v-model="editingTask.startDate"
                      type="date"
                      class="p-2 border border-gray-200 rounded-lg text-sm outline-none"
                    />
                    <input
                      v-model="editingTask.startTime"
                      type="time"
                      class="p-2 border border-gray-200 rounded-lg text-sm outline-none"
                    />
                  </div>
                  <div class="flex items-center gap-2 flex-1">
                    <label class="font-medium">Kết thúc:</label>
                    <input
                      v-model="editingTask.endDate"
                      type="date"
                      class="p-2 border border-gray-200 rounded-lg text-sm outline-none"
                    />
                    <input
                      v-model="editingTask.endTime"
                      type="time"
                      class="p-2 border border-gray-200 rounded-lg text-sm outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-3">
              <!-- Edit/Save Button -->
              <button
                v-if="!task.isEditing"
                @click="startEdit(index, task)"
                class="flex items-center justify-center p-1.5 rounded-lg text-gray-500 transition duration-200 hover:text-gray-800 hover:bg-gray-100"
                aria-label="Sửa công việc"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>

              <div v-else class="flex gap-2">
                <button
                  @click="updateTask(index)"
                  class="flex items-center justify-center p-1.5 rounded-lg text-green-600 transition duration-200 hover:text-green-700 hover:bg-green-50"
                  aria-label="Lưu thay đổi"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button
                  @click="cancelEdit()"
                  class="flex items-center justify-center p-1.5 rounded-lg text-gray-500 transition duration-200 hover:text-gray-800 hover:bg-gray-100"
                  aria-label="Hủy chỉnh sửa"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Delete Button -->
              <button
                @click="removeTask(index)"
                class="flex items-center justify-center p-1.5 rounded-lg text-red-500 transition duration-200 hover:text-red-600 hover:bg-red-50"
                aria-label="Xóa công việc"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Table View -->
        <div v-if="currentView === 'table' && tasks.length > 0" class="mb-7 overflow-x-auto">
          <table class="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead>
            <tr>
              <th class="w-16 text-center py-3.5 px-3.5 text-left border-b border-gray-200 bg-gray-50 font-semibold text-gray-800">Trạng thái</th>
              <th class="min-w-[200px] py-3.5 px-3.5 text-left border-b border-gray-200 bg-gray-50 font-semibold text-gray-800">Công việc</th>
              <th class="w-[180px] py-3.5 px-3.5 text-left border-b border-gray-200 bg-gray-50 font-semibold text-gray-800">Thời gian bắt đầu</th>
              <th class="w-[180px] py-3.5 px-3.5 text-left border-b border-gray-200 bg-gray-50 font-semibold text-gray-800">Thời gian kết thúc</th>
              <th class="w-[100px] py-3.5 px-3.5 text-right border-b border-gray-200 bg-gray-50 font-semibold text-gray-800">Thao tác</th>
            </tr>
            </thead>
            <tbody>
            <tr
              v-for="(task, index) in tasks"
              :key="index"
              class="hover:bg-gray-50 transition duration-150"
              :class="{ 'bg-gray-50 bg-opacity-50': task.completed }"
            >
              <td class="py-3.5 px-3.5 border-b border-gray-200 text-center">
                <input
                  type="checkbox"
                  :checked="task.completed"
                  @change="toggleTask(index)"
                  class="w-5 h-5 cursor-pointer accent-indigo-600"
                />
              </td>
              <td class="py-3.5 px-3.5 border-b border-gray-200" :class="{ 'line-through text-gray-500': task.completed }">
                {{ task.text }}
              </td>
              <td class="py-3.5 px-3.5 border-b border-gray-200">
                {{ formatDateTime(task.startDate, task.startTime) }}
              </td>
              <td class="py-3.5 px-3.5 border-b border-gray-200">
                {{ formatDateTime(task.endDate, task.endTime) }}
              </td>
              <td class="py-3.5 px-3.5 border-b border-gray-200 text-right">
                <div class="flex justify-end gap-3">
                  <button
                    @click="startEdit(index, task)"
                    class="flex items-center justify-center p-1.5 rounded-lg text-gray-500 transition duration-200 hover:text-gray-800 hover:bg-gray-100"
                    aria-label="Sửa công việc"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="removeTask(index)"
                    class="flex items-center justify-center p-1.5 rounded-lg text-red-500 transition duration-200 hover:text-red-600 hover:bg-red-50"
                    aria-label="Xóa công việc"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <!-- Grid View -->
        <div v-if="currentView === 'grid' && tasks.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-7">
          <div
            v-for="(task, index) in tasks"
            :key="index"
            class="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm transition duration-200 hover:shadow hover:-translate-y-0.5 flex flex-col animate-fadeIn"
            :class="{ 'bg-gray-50': task.completed }"
          >
            <div class="flex justify-between items-center p-3 border-b border-gray-200">
              <input
                type="checkbox"
                :checked="task.completed"
                @change="toggleTask(index)"
                class="w-5 h-5 cursor-pointer accent-indigo-600"
              />
              <div class="flex items-center gap-3">
                <button
                  @click="startEdit(index, task)"
                  class="flex items-center justify-center p-1.5 rounded-lg text-gray-500 transition duration-200 hover:text-gray-800 hover:bg-gray-100"
                  aria-label="Sửa công việc"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  @click="removeTask(index)"
                  class="flex items-center justify-center p-1.5 rounded-lg text-red-500 transition duration-200 hover:text-red-600 hover:bg-red-50"
                  aria-label="Xóa công việc"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="p-3 flex-grow flex flex-col gap-2">
              <h3 class="text-base font-medium" :class="{ 'line-through text-gray-500': task.completed }">{{ task.text }}</h3>
              <div class="flex flex-col gap-2 text-sm text-gray-500">
                <div>
                  <strong>Bắt đầu:</strong>
                  <div>{{ formatDateTime(task.startDate, task.startTime) }}</div>
                </div>
                <div>
                  <strong>Kết thúc:</strong>
                  <div>{{ formatDateTime(task.endDate, task.endTime) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="tasks.length === 0" class="flex flex-col items-center justify-center py-12 text-gray-500 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="text-gray-500 opacity-50 mb-4">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p class="text-lg">Chưa có công việc nào. Hãy thêm công việc mới!</p>
        </div>

        <!-- Edit Modal -->
        <div v-if="isEditModalVisible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div class="bg-white rounded-lg p-6 w-11/12 max-w-lg shadow-2xl">
            <h2 class="mb-6 text-xl font-semibold">Chỉnh sửa công việc</h2>
            <div>
              <div class="mb-4">
                <label class="font-medium">Công việc:</label>
                <input
                  v-model="editingTask.text"
                  type="text"
                  class="w-full mt-1 py-2.5 px-3.5 border border-gray-200 rounded-lg text-base outline-none transition duration-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-20"
                />
              </div>
              <div class="mb-4">
                <label class="font-medium">Bắt đầu:</label>
                <div class="flex gap-2 mt-1">
                  <input
                    v-model="editingTask.startDate"
                    type="date"
                    class="p-2 border border-gray-200 rounded-lg text-sm outline-none flex-1"
                  />
                  <input
                    v-model="editingTask.startTime"
                    type="time"
                    class="p-2 border border-gray-200 rounded-lg text-sm outline-none flex-1"
                  />
                </div>
              </div>
              <div class="mb-4">
                <label class="font-medium">Kết thúc:</label>
                <div class="flex gap-2 mt-1">
                  <input
                    v-model="editingTask.endDate"
                    type="date"
                    class="p-2 border border-gray-200 rounded-lg text-sm outline-none flex-1"
                  />
                  <input
                    v-model="editingTask.endTime"
                    type="time"
                    class="p-2 border border-gray-200 rounded-lg text-sm outline-none flex-1"
                  />
                </div>
              </div>
              <div class="flex justify-end gap-3 mt-6">
                <button @click="updateTask(editingIndex)" class="bg-indigo-600 text-white py-2.5 px-5 rounded-lg font-medium cursor-pointer transition duration-200 hover:bg-indigo-700">Lưu</button>
                <button @click="closeEditModal()" class="bg-white text-gray-800 py-2.5 px-5 rounded-lg font-medium cursor-pointer transition duration-200 border border-gray-200 hover:bg-gray-100">Hủy</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Task Summary -->
        <div v-if="tasks.length > 0" class="mt-7 text-sm text-gray-500">
          <div class="w-full h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
            <div class="h-full bg-indigo-600 rounded-full transition-all duration-300" :style="{ width: progressPercentage + '%' }"></div>
          </div>
          <p>Tổng số: {{ tasks.length }} công việc, {{ completedCount }} đã hoàn thành</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';

// State
const tasks = ref([]);
const newTask = ref({
  text: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  completed: false,
  isEditing: false
});

const currentView = ref('list'); // 'list', 'table', or 'grid'
const editingTask = ref({});
const editingIndex = ref(-1);
const isEditModalVisible = ref(false);
const editInput = ref(null);

// Initialize with today's date
const today = new Date();
const formatDateForInput = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Set default dates to today
newTask.value.startDate = formatDateForInput(today);
newTask.value.endDate = formatDateForInput(today);

// Set default times
newTask.value.startTime = '09:00';
newTask.value.endTime = '10:00';

// Computed properties
const completedCount = computed(() => {
  return tasks.value.filter(task => task.completed).length;
});

const progressPercentage = computed(() => {
  if (tasks.value.length === 0) return 0;
  return Math.round((completedCount.value / tasks.value.length) * 100);
});

// Methods
const formatDateTime = (date, time) => {
  if (!date || !time) return 'Chưa xác định';

  const dateObj = new Date(date + 'T' + time);
  const formattedDate = dateObj.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const formattedTime = dateObj.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return `${formattedDate} ${formattedTime}`;
};

const addTask = () => {
  if (newTask.value.text.trim()) {
    tasks.value.push({
      text: newTask.value.text,
      startDate: newTask.value.startDate,
      startTime: newTask.value.startTime,
      endDate: newTask.value.endDate,
      endTime: newTask.value.endTime,
      completed: false,
      isEditing: false
    });

    newTask.value.text = '';
    saveTasks();
  }
};

const toggleTask = (index) => {
  tasks.value[index].completed = !tasks.value[index].completed;
  saveTasks();
};

const removeTask = (index) => {
  tasks.value.splice(index, 1);
  saveTasks();
};

const startEdit = (index, task) => {
  closeAllEditingForms();

  if (currentView.value === 'list') {
    tasks.value[index].isEditing = true;

    // Copy task data to editingTask
    editingTask.value = { ...task };
    editingIndex.value = index;

    // Focus the input field after DOM updates
    nextTick(() => {
      if (editInput.value) {
        editInput.value.focus();
      }
    });
  } else {
    // For table and grid views, show the modal
    editingTask.value = { ...task };
    editingIndex.value = index;
    isEditModalVisible.value = true;
  }
};

const updateTask = (index) => {
  if (editingTask.value.text.trim()) {
    tasks.value[index] = {
      ...editingTask.value,
      isEditing: false
    };
    closeEditModal();
    closeAllEditingForms();
    saveTasks();
  }
};

const cancelEdit = () => {
  closeAllEditingForms();
};

const closeAllEditingForms = () => {
  tasks.value.forEach(task => {
    task.isEditing = false;
  });
  isEditModalVisible.value = false;
};

const closeEditModal = () => {
  isEditModalVisible.value = false;
};

// Local storage
const saveTasks = () => {
  localStorage.setItem('vue-todo-tasks', JSON.stringify(tasks.value));
};

const loadTasks = () => {
  const savedTasks = localStorage.getItem('vue-todo-tasks');
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks);
    // Ensure all tasks have the isEditing property
    tasks.value.forEach(task => {
      if (task.isEditing === undefined) {
        task.isEditing = false;
      }
    });
  }
};

// Lifecycle hooks
onMounted(() => {
  loadTasks();
});
</script>
