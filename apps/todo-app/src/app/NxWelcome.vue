<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 flex justify-center items-start">
    <div class="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 transition-all duration-300">
      <div class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 text-center relative">
        <div class="text-3xl font-bold tracking-tight">To-Do App</div>
        <p class="text-blue-100 mt-2">Organize your tasks efficiently</p>
      </div>

      <div class="p-7">
        <!-- Add Task Form -->
        <form @submit.prevent="addTask" class="mb-7 shadow-sm rounded-lg p-5 bg-white border border-gray-200 hover:shadow-md transition-shadow duration-300">
          <div class="mb-4">
            <input
              v-model="newTask.text"
              type="text"
              placeholder="Add a new task..."
              required
              class="w-full py-3.5 px-5 border border-gray-200 rounded-lg text-base outline-none transition duration-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-20"
            />
          </div>
          <div class="flex flex-col md:flex-row gap-4 mb-4">
            <div class="flex items-center gap-2 flex-1">
              <label class="font-medium">Start:</label>
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
              <label class="font-medium">End:</label>
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
          <button
            type="submit"
            class="w-full bg-indigo-600 text-white py-3.5 px-6 rounded-lg cursor-pointer text-base font-medium transition duration-200 hover:bg-indigo-700"
          >
            Add Task
          </button>
        </form>

        <!-- View Controls and Filters -->
        <div class="flex flex-col md:flex-row justify-between items-center mb-5 gap-4">
          <!-- Status Filter -->
          <div class="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
              @click="statusFilter = 'all'"
              :class="{ 'bg-indigo-600 text-white': statusFilter === 'all', 'bg-white hover:bg-gray-100': statusFilter !== 'all' }"
              class="px-4 py-2 transition duration-200"
            >
              All
            </button>
            <button
              @click="statusFilter = 'completed'"
              :class="{ 'bg-green-600 text-white': statusFilter === 'completed', 'bg-white hover:bg-gray-100': statusFilter !== 'completed' }"
              class="px-4 py-2 transition duration-200"
            >
              Completed
            </button>
            <button
              @click="statusFilter = 'incomplete'"
              :class="{ 'bg-red-600 text-white': statusFilter === 'incomplete', 'bg-white hover:bg-gray-100': statusFilter !== 'incomplete' }"
              class="px-4 py-2 transition duration-200"
            >
              Incomplete
            </button>
          </div>

          <!-- View Switcher -->
          <div class="flex border border-gray-200 rounded-lg overflow-hidden">
            <button
              @click="currentView = 'list'"
              :class="{ 'bg-indigo-600 text-white': currentView === 'list', 'bg-white hover:bg-gray-100': currentView !== 'list' }"
              class="p-2 transition duration-200"
              aria-label="List view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              @click="currentView = 'table'"
              :class="{ 'bg-indigo-600 text-white': currentView === 'table', 'bg-white hover:bg-gray-100': currentView !== 'table' }"
              class="p-2 transition duration-200"
              aria-label="Table view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18M3 6h18M3 18h18" />
              </svg>
            </button>
            <button
              @click="currentView = 'grid'"
              :class="{ 'bg-indigo-600 text-white': currentView === 'grid', 'bg-white hover:bg-gray-100': currentView !== 'grid' }"
              class="p-2 transition duration-200"
              aria-label="Grid view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- List View -->
        <div v-if="currentView === 'list' && filteredTasks.length > 0" class="flex flex-col gap-3.5">
          <div
            v-for="(task, index) in filteredTasks"
            :key="index"
            :class="`flex items-start justify-between p-4 border rounded-lg bg-white transition duration-200 hover:shadow hover:-translate-y-0.5 animate-fadeIn ${
              task.completed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
            }`"
          >
            <!-- View Mode -->
            <div v-if="!task.isEditing" class="flex items-start gap-3.5 flex-grow">
              <div class="mt-1">
                <input
                  type="checkbox"
                  :checked="task.completed"
                  @change="toggleTask(index)"
                  class="w-5 h-5 cursor-pointer accent-indigo-600"
                />
              </div>
              <div class="flex flex-col gap-1">
                <span
                  :class="`text-base font-medium transition duration-200 ${
                    task.completed ? 'line-through text-gray-500' : ''
                  }`"
                >
                  {{ task.text }}
                </span>
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <span class="font-medium">Start:</span>
                  <span>{{ formatDateTime(task.startDate, task.startTime) }}</span>
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <span class="font-medium">End:</span>
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
                    <label class="font-medium">Start:</label>
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
                    <label class="font-medium">End:</label>
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
              <div class="mt-1">
                  <span
                    :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      task.completed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`"
                  >
                    {{ task.completed ? 'Completed' : 'Incomplete' }}
                  </span>
              </div>
              <template v-if="!task.isEditing">
                <button
                  @click="startEdit(index, task)"
                  class="flex items-center justify-center p-1.5 rounded-lg text-gray-500 transition duration-200 hover:text-gray-800 hover:bg-gray-100"
                  aria-label="Edit task"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </template>
              <template v-else>
                <div class="flex gap-2">
                  <button
                    @click="updateTask(index)"
                    class="flex items-center justify-center p-1.5 rounded-lg text-green-600 transition duration-200 hover:text-green-700 hover:bg-green-50"
                    aria-label="Save changes"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <button
                    @click="cancelEdit()"
                    class="flex items-center justify-center p-1.5 rounded-lg text-gray-500 transition duration-200 hover:text-gray-800 hover:bg-gray-100"
                    aria-label="Cancel edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </template>

              <!-- Delete Button -->
              <button
                @click="removeTask(index)"
                class="flex items-center justify-center p-1.5 rounded-lg text-red-500 transition duration-200 hover:text-red-600 hover:bg-red-50"
                aria-label="Delete task"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Table View -->
        <div v-if="currentView === 'table' && filteredTasks.length > 0" class="mb-7 overflow-x-auto">
          <table class="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead>
            <tr>
              <th class="w-16 text-center py-3.5 px-3.5 text-left border-b border-gray-200 bg-gray-50 font-semibold text-gray-800">
                Status
              </th>
              <th class="min-w-[200px] py-3.5 px-3.5 text-left border-b border-gray-200 bg-gray-50 font-semibold text-gray-800">
                Task
              </th>
              <th class="w-[180px] py-3.5 px-3.5 text-left border-b border-gray-200 bg-gray-50 font-semibold text-gray-800">
                Start Time
              </th>
              <th class="w-[180px] py-3.5 px-3.5 text-left border-b border-gray-200 bg-gray-50 font-semibold text-gray-800">
                End Time
              </th>
              <th class="w-[100px] py-3.5 px-3.5 text-right border-b border-gray-200 bg-gray-50 font-semibold text-gray-800">
                Actions
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
              v-for="(task, index) in filteredTasks"
              :key="index"
              :class="`hover:bg-gray-50 transition duration-150 ${
                  task.completed ? 'bg-green-50' : 'bg-red-50'
                }`"
            >
              <td class="py-3.5 px-3.5 border-b border-gray-200 text-center">
                <div class="flex justify-center">
                  <input
                    type="checkbox"
                    :checked="task.completed"
                    @change="toggleTask(index)"
                    class="w-5 h-5 cursor-pointer accent-indigo-600"
                  />
                </div>
                <div class="mt-1 text-xs text-center">
                    <span
                      :class="`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        task.completed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`"
                    >
                      {{ task.completed ? 'Done' : 'Todo' }}
                    </span>
                </div>
              </td>
              <td
                :class="`py-3.5 px-3.5 border-b border-gray-200 ${
                    task.completed ? 'line-through text-gray-500' : ''
                  }`"
              >
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
                    aria-label="Edit task"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="removeTask(index)"
                    class="flex items-center justify-center p-1.5 rounded-lg text-red-500 transition duration-200 hover:text-red-600 hover:bg-red-50"
                    aria-label="Delete task"
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
        <div v-if="currentView === 'grid' && filteredTasks.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-7">
          <div
            v-for="(task, index) in filteredTasks"
            :key="index"
            :class="`border rounded-lg overflow-hidden shadow-sm transition duration-200 hover:shadow hover:-translate-y-0.5 flex flex-col animate-fadeIn ${
              task.completed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
            }`"
          >
            <div class="flex justify-between items-center p-3 border-b border-gray-200">
              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  :checked="task.completed"
                  @change="toggleTask(index)"
                  class="w-5 h-5 cursor-pointer accent-indigo-600"
                />
                <span
                  :class="`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    task.completed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`"
                >
                  {{ task.completed ? 'Completed' : 'Incomplete' }}
                </span>
              </div>
              <div class="flex items-center gap-3">
                <button
                  @click="startEdit(index, task)"
                  class="flex items-center justify-center p-1.5 rounded-lg text-gray-500 transition duration-200 hover:text-gray-800 hover:bg-gray-100"
                  aria-label="Edit task"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  @click="removeTask(index)"
                  class="flex items-center justify-center p-1.5 rounded-lg text-red-500 transition duration-200 hover:text-red-600 hover:bg-red-50"
                  aria-label="Delete task"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="p-3 flex-grow flex flex-col gap-2">
              <h3 :class="`text-base font-medium ${task.completed ? 'line-through text-gray-500' : ''}`">
                {{ task.text }}
              </h3>
              <div class="flex flex-col gap-2 text-sm text-gray-500">
                <div>
                  <strong>Start:</strong>
                  <div>{{ formatDateTime(task.startDate, task.startTime) }}</div>
                </div>
                <div>
                  <strong>End:</strong>
                  <div>{{ formatDateTime(task.endDate, task.endTime) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="tasks.length === 0 || filteredTasks.length === 0" class="flex flex-col items-center justify-center py-12 text-gray-500 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="text-gray-500 opacity-50 mb-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p class="text-lg">
            {{ tasks.length === 0
            ? "No tasks yet. Add a new task to get started!"
            : "No tasks match your filter. Try a different filter." }}
          </p>
        </div>

        <!-- Edit Modal -->
        <div v-if="isEditModalVisible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div class="bg-white rounded-lg p-6 w-11/12 max-w-lg shadow-2xl">
            <h2 class="mb-6 text-xl font-semibold">Edit Task</h2>
            <div>
              <div class="mb-4">
                <label class="font-medium">Task:</label>
                <input
                  v-model="editingTask.text"
                  type="text"
                  class="w-full mt-1 py-2.5 px-3.5 border border-gray-200 rounded-lg text-base outline-none transition duration-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-20"
                />
              </div>
              <div class="mb-4">
                <label class="font-medium">Start:</label>
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
                <label class="font-medium">End:</label>
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
                <button
                  @click="updateTask(editingIndex)"
                  class="bg-indigo-600 text-white py-2.5 px-5 rounded-lg font-medium cursor-pointer transition duration-200 hover:bg-indigo-700"
                >
                  Save
                </button>
                <button
                  @click="closeEditModal"
                  class="bg-white text-gray-800 py-2.5 px-5 rounded-lg font-medium cursor-pointer transition duration-200 border border-gray-200 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Task Summary -->
        <div v-if="tasks.length > 0" class="mt-7 text-sm text-gray-500">
          <div class="w-full h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
            <div
              class="h-full bg-indigo-600 rounded-full transition-all duration-300"
              :style="{ width: progressPercentage + '%' }"
            ></div>
          </div>
          <p>
            Total: {{ tasks.length }} tasks, {{ completedCount }} completed
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue';

// Define types
interface Task {
  text: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  completed: boolean;
  isEditing: boolean;
}

type ViewType = 'list' | 'table' | 'grid';
type StatusFilterType = 'all' | 'completed' | 'incomplete';

// State
const tasks = ref<Task[]>([]);
const newTask = ref<Task>({
  text: '',
  startDate: formatDateForInput(new Date()),
  startTime: '09:00',
  endDate: formatDateForInput(new Date()),
  endTime: '10:00',
  completed: false,
  isEditing: false
});

const currentView = ref<ViewType>('list');
const editingTask = ref<Task>({} as Task);
const editingIndex = ref<number>(-1);
const isEditModalVisible = ref<boolean>(false);
const statusFilter = ref<StatusFilterType>('all');
const editInput = ref<HTMLInputElement | null>(null);

// Computed properties
const completedCount = computed((): number => {
  return tasks.value.filter(task => task.completed).length;
});

const progressPercentage = computed((): number => {
  if (tasks.value.length === 0) return 0;
  return Math.round((completedCount.value / tasks.value.length) * 100);
});

const filteredTasks = computed((): Task[] => {
  return tasks.value.filter(task => {
    if (statusFilter.value === 'all') return true;
    if (statusFilter.value === 'completed') return task.completed;
    if (statusFilter.value === 'incomplete') return !task.completed;
    return true;
  });
});

// Methods
function formatDateForInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDateTime(date: string, time: string): string {
  if (!date || !time) return 'Not specified';

  try {
    const dateObj = new Date(`${date}T${time}`);

    // Using Intl.DateTimeFormat instead of date-fns
    const formatter = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    return formatter.format(dateObj);
  } catch (error) {
    return 'Invalid date';
  }
}

function addTask(): void {
  if (newTask.value.text.trim()) {
    tasks.value.push({
      ...newTask.value,
      text: newTask.value.text.trim(),
      isEditing: false
    });

    newTask.value.text = '';
    saveTasks();
  }
}

function toggleTask(index: number): void {
  const taskIndex = getTaskIndexFromFilteredIndex(index);
  if (taskIndex !== -1) {
    tasks.value[taskIndex].completed = !tasks.value[taskIndex].completed;
    saveTasks();
  }
}

function removeTask(index: number): void {
  const taskIndex = getTaskIndexFromFilteredIndex(index);
  if (taskIndex !== -1) {
    tasks.value.splice(taskIndex, 1);
    saveTasks();
  }
}

function startEdit(index: number, task: Task): void {
  closeAllEditingForms();

  const taskIndex = getTaskIndexFromFilteredIndex(index);
  if (taskIndex !== -1) {
    if (currentView.value === 'list') {
      tasks.value[taskIndex].isEditing = true;
    }

    editingTask.value = { ...task };
    editingIndex.value = taskIndex;

    if (currentView.value !== 'list') {
      isEditModalVisible.value = true;
    }
  }
}

function updateTask(index: number): void {
  if (editingTask.value && editingTask.value.text.trim()) {
    tasks.value[index] = {
      ...editingTask.value,
      isEditing: false
    };
    closeEditModal();
    closeAllEditingForms();
    saveTasks();
  }
}

function cancelEdit(): void {
  closeAllEditingForms();
}

function closeAllEditingForms(): void {
  tasks.value.forEach(task => {
    task.isEditing = false;
  });
  isEditModalVisible.value = false;
}

function closeEditModal(): void {
  isEditModalVisible.value = false;
}

// Helper function to get the actual task index from the filtered index
function getTaskIndexFromFilteredIndex(filteredIndex: number): number {
  const filteredTask = filteredTasks.value[filteredIndex];
  return tasks.value.findIndex(task =>
    task.text === filteredTask.text &&
    task.startDate === filteredTask.startDate &&
    task.startTime === filteredTask.startTime
  );
}

// Local storage
function saveTasks(): void {
  localStorage.setItem('vue-todo-tasks', JSON.stringify(tasks.value));
}

function loadTasks(): void {
  const savedTasks = localStorage.getItem('vue-todo-tasks');
  if (savedTasks) {
    try {
      const parsedTasks = JSON.parse(savedTasks);
      // Ensure all tasks have the isEditing property
      tasks.value = parsedTasks.map((task: Task) => ({
        ...task,
        isEditing: task.isEditing || false
      }));
    } catch (error) {
      console.error('Failed to parse tasks from localStorage', error);
    }
  }
}

// Focus edit input when editing starts
onMounted(() => {
  loadTasks();
});

// Watch for editing mode to focus input
watch(
  () => tasks.value.some(task => task.isEditing),
  (isEditing) => {
    if (isEditing) {
      nextTick(() => {
        if (editInput.value) {
          editInput.value.focus();
        }
      });
    }
  }
);
</script>

<style>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>
