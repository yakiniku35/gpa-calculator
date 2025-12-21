// Language definitions
const translations = {
    zh: {
        pageTitle: '學分與 GPA 計算機',
        versionLabel: '學分制版本',
        scale43: '4.3 學分制',
        scale40: '4.0 學分制',
        gradingStandard: '計分標準',
        scoreRange: '分數區間',
        grade: '等級',
        gp: 'GP',
        percentage: '轉換百分比',
        courseList: '課程列表',
        addCourse: '新增課程',
        courseName: '課程名稱',
        credits: '學分數',
        score: '成績',
        gradeType: '等級',
        scoreType: '分數',
        selectGrade: '選擇等級',
        delete: '刪除',
        results: '計算結果',
        totalCredits: '總學分',
        weightedSum: '加權總分',
        averageGPA: '平均 GPA',
        exportPDF: '匯出 PDF',
        noCourses: '尚未新增課程',
        clickToAdd: '點擊上方「新增課程」開始',
        coursePlaceholder: '例：微積分',
        pdfLanguage: '語言選擇',
        pdfZh: '中文',
        pdfEn: 'English',
        pdfBoth: '中英雙語'
    },
    en: {
        pageTitle: 'GPA Calculator',
        versionLabel: 'Grading System',
        scale43: '4.3 Scale',
        scale40: '4.0 Scale',
        gradingStandard: 'Grading Standard',
        scoreRange: 'Score Range',
        grade: 'Grade',
        gp: 'GP',
        percentage: 'Percentage',
        courseList: 'Course List',
        addCourse: 'Add Course',
        courseName: 'Course Name',
        credits: 'Credits',
        score: 'Score',
        gradeType: 'Grade',
        scoreType: 'Score',
        selectGrade: 'Select Grade',
        delete: 'Delete',
        results: 'Results',
        totalCredits: 'Total Credits',
        weightedSum: 'Weighted Sum',
        averageGPA: 'Average GPA',
        exportPDF: 'Export PDF',
        noCourses: 'No courses yet',
        clickToAdd: 'Click "Add Course" to start',
        coursePlaceholder: 'e.g., Calculus',
        pdfLanguage: 'Language',
        pdfZh: 'Chinese',
        pdfEn: 'English',
        pdfBoth: 'Bilingual'
    }
};

let currentLanguage = 'zh';

// Grading System Data
const gradingSystem = {
    '4.3': [
        { min: 90, max: 100, grade: 'A+', gp: 4.3, avg: 95 },
        { min: 85, max: 89, grade: 'A', gp: 4.0, avg: 87 },
        { min: 80, max: 84, grade: 'A-', gp: 3.7, avg: 82 },
        { min: 77, max: 79, grade: 'B+', gp: 3.3, avg: 78 },
        { min: 73, max: 76, grade: 'B', gp: 3.0, avg: 75 },
        { min: 70, max: 72, grade: 'B-', gp: 2.7, avg: 71 },
        { min: 67, max: 69, grade: 'C+', gp: 2.3, avg: 68 },
        { min: 63, max: 66, grade: 'C', gp: 2.0, avg: 65 },
        { min: 60, max: 62, grade: 'C-', gp: 1.7, avg: 61 },
        { min: 50, max: 59, grade: 'D', gp: 1.0, avg: 55 },
        { min: 1, max: 49, grade: 'E', gp: 0.0, avg: 49 },
        { min: 0, max: 0, grade: 'X', gp: 0.0, avg: 0 }
    ],
    '4.0': [
        { min: 80, max: 100, grade: 'A', gp: 4, avg: 90 },
        { min: 70, max: 79, grade: 'B', gp: 3, avg: 75 },
        { min: 60, max: 69, grade: 'C', gp: 2, avg: 65 },
        { min: 50, max: 59, grade: 'D', gp: 1, avg: 55 },
        { min: 0, max: 49, grade: 'F', gp: 0, avg: 25 }
    ]
};

let currentSystem = '4.3';
let courses = [];

function renderPage() {
    const t = translations[currentLanguage];
    document.getElementById('mainContent').innerHTML = `
        <!-- Top Left Controls -->
        <div class="fixed top-4 left-4 sm:top-4 sm:left-4 z-40 flex items-center gap-2 sm:gap-3">
            <!-- GitHub Link -->
            <a href="https://github.com/yakiniku35/gpa-calculator" target="_blank" rel="noopener noreferrer" 
               class="apple-button bg-white hover:bg-gray-50 text-gray-700 p-2 sm:p-2.5 rounded-xl shadow-lg border border-gray-200 flex items-center justify-center transition-all hover:scale-105"
               title="View on GitHub">
                <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
                </svg>
            </a>
            
            <!-- Language Toggle -->
            <div class="relative">
                <button id="languageToggle" class="apple-button bg-white hover:bg-gray-50 text-gray-700 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-lg border border-gray-200 flex items-center gap-1.5 sm:gap-2">
                    <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                    </svg>
                    <span id="currentLang" class="hidden sm:inline">${currentLanguage === 'zh' ? '繁體中文' : 'English'}</span>
                    <span id="currentLangShort" class="inline sm:hidden">${currentLanguage === 'zh' ? '中' : 'EN'}</span>
                    <svg class="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                </button>
                <!-- Dropdown Menu -->
                <div id="languageMenu" class="hidden absolute top-12 left-0 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden min-w-[140px] sm:min-w-[150px]">
                    <button onclick="changeLanguage('zh')" class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left text-xs sm:text-sm hover:bg-gray-50 flex items-center gap-2 ${currentLanguage === 'zh' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'}">
                        <span class="text-base sm:text-lg">🇹🇼</span>
                        <span>繁體中文</span>
                    </button>
                    <button onclick="changeLanguage('en')" class="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left text-xs sm:text-sm hover:bg-gray-50 flex items-center gap-2 ${currentLanguage === 'en' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'}">
                        <span class="text-base sm:text-lg">🇺🇸</span>
                        <span>English</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Header -->
        <div class="apple-card p-6 sm:p-8 mb-4 sm:mb-6 mt-12 sm:mt-0">
            <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4 sm:mb-6 tracking-tight">${t.pageTitle}</h1>
            
            <!-- Version Toggle -->
            <div class="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
                <label class="text-xs sm:text-sm font-medium text-gray-600">${t.versionLabel}</label>
                <div class="inline-flex bg-gray-100 rounded-xl p-1 gap-1">
                    <button id="btn43" class="apple-button px-6 sm:px-8 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-blue-500 text-white shadow-sm">
                        ${t.scale43}
                    </button>
                    <button id="btn40" class="apple-button px-6 sm:px-8 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-gray-700 hover:bg-white">
                        ${t.scale40}
                    </button>
                </div>
            </div>
        </div>

        <!-- Main Layout: Left Grading Scale + Right Course Input -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <!-- Left: Grading Scale Reference -->
            <div class="lg:col-span-4">
                <div class="apple-card p-4 sm:p-6 lg:sticky lg:top-6">
                    <h2 class="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-5 tracking-tight">${t.gradingStandard}</h2>
                    <div id="gradeTable" class="overflow-x-auto"></div>
                </div>
            </div>

            <!-- Right: Course Input Section -->
            <div class="lg:col-span-8">
                <div class="apple-card p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <h2 class="text-base sm:text-lg font-semibold text-gray-900 tracking-tight">${t.courseList}</h2>
                        <button id="addCourse" class="apple-button bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-sm flex items-center gap-2 w-full sm:w-auto justify-center">
                            <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
                            </svg>
                            ${t.addCourse}
                        </button>
                    </div>
                    
                    <div class="divider mb-4 sm:mb-6"></div>
                    
                    <!-- Course Headers -->
                    <div class="hidden md:grid grid-cols-12 gap-4 mb-4 text-xs font-medium text-gray-500 uppercase tracking-wide px-1">
                        <div class="col-span-4">${t.courseName}</div>
                        <div class="col-span-2">${t.credits}</div>
                        <div class="col-span-5">${t.score}</div>
                        <div class="col-span-1"></div>
                    </div>
                    
                    <!-- Course List -->
                    <div id="courseList" class="space-y-2 sm:space-y-3"></div>
                </div>

                <!-- Results Section -->
                <div class="apple-card p-4 sm:p-6 md:p-8">
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <h2 class="text-base sm:text-lg font-semibold text-gray-900 tracking-tight">${t.results}</h2>
                        <div class="flex gap-2 items-center w-full sm:w-auto">
                            <select id="pdfLanguage" class="apple-input px-3 sm:px-3.5 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm font-medium text-gray-900 focus:bg-white focus:border-blue-500 focus:outline-none flex-1 sm:flex-initial">
                                <option value="zh">${t.pdfZh}</option>
                                <option value="en">${t.pdfEn}</option>
                                <option value="both">${t.pdfBoth}</option>
                            </select>
                            <button id="exportPDF" class="apple-button bg-gray-800 hover:bg-gray-900 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-sm flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                                <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                </svg>
                                <span class="hidden sm:inline">${t.exportPDF}</span>
                                <span class="inline sm:hidden">PDF</span>
                            </button>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                        <div class="bg-gray-50 rounded-xl p-4 sm:p-6 text-center border border-gray-100">
                            <div class="text-xs font-medium text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">${t.totalCredits}</div>
                            <div id="totalCredits" class="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">0</div>
                        </div>
                        <div class="bg-gray-50 rounded-xl p-4 sm:p-6 text-center border border-gray-100">
                            <div class="text-xs font-medium text-gray-500 mb-1 sm:mb-2 uppercase tracking-wide">${t.weightedSum}</div>
                            <div id="weightedSum" class="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">0.00</div>
                        </div>
                        <div class="bg-blue-50 rounded-xl p-4 sm:p-6 text-center border border-blue-100">
                            <div class="text-xs font-medium text-blue-600 mb-1 sm:mb-2 uppercase tracking-wide">${t.averageGPA}</div>
                            <div id="averageGPA" class="text-3xl sm:text-4xl font-bold text-blue-600 tracking-tight">0.00</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    setupEventListeners();
    updateGradeTable();
    addCourse();
    setupLanguageToggle();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderPage();
});

function setupLanguageToggle() {
    const toggleBtn = document.getElementById('languageToggle');
    const menu = document.getElementById('languageMenu');
    
    if (toggleBtn && menu) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('hidden');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!toggleBtn.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.add('hidden');
            }
        });
    }
}

function changeLanguage(lang) {
    if (lang !== currentLanguage) {
        currentLanguage = lang;
        renderPage();
    }
}



function setupEventListeners() {
    document.getElementById('btn43').addEventListener('click', () => switchSystem('4.3'));
    document.getElementById('btn40').addEventListener('click', () => switchSystem('4.0'));
    document.getElementById('addCourse').addEventListener('click', addCourse);
    document.getElementById('exportPDF').addEventListener('click', exportToPDF);
}

function switchSystem(system) {
    currentSystem = system;
    const t = translations[currentLanguage];
    
    // Update button styles
    document.getElementById('btn43').className = system === '4.3' 
        ? 'apple-button px-8 py-2.5 rounded-lg text-sm font-semibold bg-blue-500 text-white shadow-sm'
        : 'apple-button px-8 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-white';
    
    document.getElementById('btn40').className = system === '4.0'
        ? 'apple-button px-8 py-2.5 rounded-lg text-sm font-semibold bg-blue-500 text-white shadow-sm'
        : 'apple-button px-8 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-white';
    
    // Update button text
    document.getElementById('btn43').textContent = t.scale43;
    document.getElementById('btn40').textContent = t.scale40;
    
    updateGradeTable();
    updateAllCourseInputs();
    calculate();
}

function updateGradeTable() {
    const t = translations[currentLanguage];
    const table = document.getElementById('gradeTable');
    const grades = gradingSystem[currentSystem];
    
    let html = `
        <table class="w-full text-sm">
            <thead>
                <tr class="border-b border-gray-200">
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${t.scoreRange}</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${t.grade}</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${t.gp}</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${t.percentage}</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
    `;
    
    grades.forEach((g) => {
        const range = g.grade === 'X' ? 'N/A' : `${g.min}-${g.max}`;
        html += `
            <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-4 py-3 text-gray-600">${range}</td>
                <td class="px-4 py-3">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-sm font-semibold bg-gray-100 text-gray-800">${g.grade}</span>
                </td>
                <td class="px-4 py-3 text-gray-900 font-semibold">${g.gp}</td>
                <td class="px-4 py-3 text-gray-600">${g.avg}</td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    table.innerHTML = html;
}

function addCourse() {
    const course = {
        id: Date.now(),
        name: '',
        credits: '',
        scoreType: 'grade',
        gradeValue: '',
        scoreValue: ''
    };
    
    courses.push(course);
    renderCourses();
}

function removeCourse(id) {
    courses = courses.filter(c => c.id !== id);
    renderCourses();
    calculate();
}

function renderCourses() {
    const t = translations[currentLanguage];
    const list = document.getElementById('courseList');
    
    if (courses.length === 0) {
        list.innerHTML = `
            <div class="text-center py-12">
                <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
                <p class="text-gray-500 text-sm">${t.noCourses}</p>
                <p class="text-gray-400 text-xs mt-1">${t.clickToAdd}</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = courses.map(course => `
        <div class="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:border-gray-300 transition-colors fade-in" data-id="${course.id}">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3">
                <!-- Course Name -->
                <div class="md:col-span-4">
                    <label class="block text-xs font-medium text-gray-500 mb-1 sm:mb-1.5 md:hidden">${t.courseName}</label>
                    <input type="text" 
                           class="apple-input w-full px-3 sm:px-3.5 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm font-medium text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:outline-none"
                           placeholder="${t.coursePlaceholder}"
                           value="${course.name}"
                           onchange="updateCourse(${course.id}, 'name', this.value)">
                </div>
                
                <!-- Credits -->
                <div class="md:col-span-2">
                    <label class="block text-xs font-medium text-gray-500 mb-1 sm:mb-1.5 md:hidden">${t.credits}</label>
                    <input type="number" 
                           class="apple-input w-full px-3 sm:px-3.5 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm font-medium text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:outline-none"
                           placeholder="3"
                           min="0"
                           step="0.5"
                           value="${course.credits}"
                           onchange="updateCourse(${course.id}, 'credits', this.value); calculate();">
                </div>
                
                <!-- Score Input -->
                <div class="md:col-span-5">
                    <label class="block text-xs font-medium text-gray-500 mb-1 sm:mb-1.5 md:hidden">${t.score}</label>
                    <div class="flex gap-1.5 sm:gap-2">
                        <select class="apple-input flex-shrink-0 w-20 sm:w-24 px-2 sm:px-3.5 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm font-medium text-gray-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                                onchange="updateCourse(${course.id}, 'scoreType', this.value); toggleScoreInput(${course.id}, this.value);">
                            <option value="grade" ${course.scoreType === 'grade' ? 'selected' : ''}>${t.gradeType}</option>
                            <option value="score" ${course.scoreType === 'score' ? 'selected' : ''}>${t.scoreType}</option>
                        </select>
                        
                        <select id="gradeSelect${course.id}" 
                                class="apple-input flex-1 min-h-[38px] sm:min-h-[42px] px-2 sm:px-3.5 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm font-medium text-gray-900 focus:bg-white focus:border-blue-500 focus:outline-none ${course.scoreType === 'grade' ? '' : 'hidden'}"
                                onchange="updateCourse(${course.id}, 'gradeValue', this.value); calculate();">
                            <option value="">${t.selectGrade}</option>
                            ${gradingSystem[currentSystem].map(g => 
                                `<option value="${g.grade}" ${course.gradeValue === g.grade ? 'selected' : ''}>${g.grade} (${g.gp})</option>`
                            ).join('')}
                        </select>
                        
                        <input id="scoreInput${course.id}" 
                               type="number" 
                               class="apple-input flex-1 min-h-[38px] sm:min-h-[42px] px-2 sm:px-3.5 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm font-medium text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:outline-none ${course.scoreType === 'score' ? '' : 'hidden'}"
                               placeholder="0-100"
                               min="0"
                               max="100"
                               value="${course.scoreValue}"
                               onchange="updateCourse(${course.id}, 'scoreValue', this.value); calculate();">
                    </div>
                </div>
                
                <!-- Delete Button -->
                <div class="md:col-span-1 flex items-end md:items-center">
                    <button onclick="removeCourse(${course.id})" 
                            class="apple-button w-full md:w-auto p-2 sm:p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all font-medium"
                            title="${t.delete}">
                        <svg class="w-4 h-4 sm:w-5 sm:h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function updateCourse(id, field, value) {
    const course = courses.find(c => c.id === id);
    if (course) {
        course[field] = value;
    }
}

function toggleScoreInput(id, type) {
    const gradeSelect = document.getElementById(`gradeSelect${id}`);
    const scoreInput = document.getElementById(`scoreInput${id}`);
    
    if (type === 'grade') {
        gradeSelect.classList.remove('hidden');
        scoreInput.classList.add('hidden');
    } else {
        gradeSelect.classList.add('hidden');
        scoreInput.classList.remove('hidden');
    }
    
    calculate();
}

function updateAllCourseInputs() {
    courses.forEach(course => {
        course.gradeValue = '';
        course.scoreValue = '';
    });
    renderCourses();
}

function getGradePoint(course) {
    const grades = gradingSystem[currentSystem];
    
    if (course.scoreType === 'grade' && course.gradeValue) {
        const found = grades.find(g => g.grade === course.gradeValue);
        return found ? found.gp : null;
    } else if (course.scoreType === 'score' && course.scoreValue !== '') {
        const score = parseFloat(course.scoreValue);
        if (isNaN(score)) return null;
        
        const found = grades.find(g => score >= g.min && score <= g.max);
        return found ? found.gp : null;
    }
    
    return null;
}

function calculate() {
    let totalCredits = 0;
    let weightedSum = 0;
    
    courses.forEach(course => {
        const credits = parseFloat(course.credits);
        const gp = getGradePoint(course);
        
        if (!isNaN(credits) && credits > 0 && gp !== null) {
            totalCredits += credits;
            weightedSum += credits * gp;
        }
    });
    
    const gpa = totalCredits > 0 ? (weightedSum / totalCredits) : 0;
    
    document.getElementById('totalCredits').textContent = totalCredits.toFixed(1);
    document.getElementById('weightedSum').textContent = weightedSum.toFixed(2);
    document.getElementById('averageGPA').textContent = gpa.toFixed(2);
}

function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const language = document.getElementById('pdfLanguage').value;
    
    const doc = new jsPDF();
    
    // 語言文本定義
    const text = {
        zh: {
            title: '學期成績報告',
            date: '日期',
            system: '計分制度',
            scale43: '4.3 學分制',
            scale40: '4.0 學分制',
            courseName: '課程名稱',
            credits: '學分',
            grade: '成績',
            gp: '績點',
            weighted: '加權分數',
            summary: '計算結果',
            totalCredits: '總學分',
            weightedSum: '加權總分',
            averageGPA: '平均績點',
            noData: '尚無課程資料',
            footer: '由 GPA 計算機生成'
        },
        en: {
            title: 'GPA Report',
            date: 'Date',
            system: 'Grading System',
            scale43: '4.3 Scale',
            scale40: '4.0 Scale',
            courseName: 'Course Name',
            credits: 'Credits',
            grade: 'Grade',
            gp: 'GP',
            weighted: 'Weighted',
            summary: 'Summary',
            totalCredits: 'Total Credits',
            weightedSum: 'Weighted Sum',
            averageGPA: 'Average GPA',
            noData: 'No course data available',
            footer: 'Generated by GPA Calculator'
        }
    };
    
    // 使用 Courier 字體作為英文基礎字體
    doc.setFont("courier");
    
    // 添加藍色標題背景
    doc.setFillColor(59, 130, 246);
    doc.rect(0, 0, 210, 35, 'F');
    
    // 標題 (白色字)
    doc.setTextColor(255, 255, 255);
    doc.setFont("courier", "bold");
    if (language === 'both') {
        doc.setFontSize(22);
        doc.text('GPA Report', 105, 15, { align: 'center' });
        doc.setFontSize(18);
        // 雙語模式用拼音代替
        doc.text('Xuesheng Chengji Baogao', 105, 25, { align: 'center' });
    } else if (language === 'en') {
        doc.setFontSize(22);
        doc.text(text[language].title, 105, 20, { align: 'center' });
    } else {
        // 純中文使用英文標題 + 拼音
        doc.setFontSize(22);
        doc.text('GPA Report', 105, 15, { align: 'center' });
        doc.setFontSize(16);
        doc.text('(Chengji Baogao)', 105, 23, { align: 'center' });
    }
    
    // 重置文字顏色
    doc.setTextColor(0, 0, 0);
    doc.setFont("courier", "normal");
    
    // 日期和系統資訊區域
    doc.setFontSize(10);
    const today = new Date().toLocaleDateString(language === 'zh' ? 'zh-TW' : 'en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // 資訊框
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(15, 40, 180, 18, 2, 2, 'F');
    
    doc.setFontSize(10);
    doc.setTextColor(75, 85, 99);
    
    if (language === 'both') {
        doc.text(`Date / Riqi: ${today}`, 20, 48);
    } else if (language === 'en') {
        doc.text(`${text[language].date}: ${today}`, 20, 48);
    } else {
        doc.text(`Riqi: ${today}`, 20, 48);
    }
    
    // 學分制版本
    const systemText = currentSystem === '4.3' ? 
        (language === 'both' ? '4.3 Scale / 4.3 Xuefen Zhi' : language === 'en' ? text[language].scale43 : '4.3 Xuefen Zhi') :
        (language === 'both' ? '4.0 Scale / 4.0 Xuefen Zhi' : language === 'en' ? text[language].scale40 : '4.0 Xuefen Zhi');
    
    if (language === 'both') {
        doc.text(`Grading System / Jifen Zhidu: ${systemText}`, 20, 54);
    } else if (language === 'en') {
        doc.text(`${text[language].system}: ${systemText}`, 20, 54);
    } else {
        doc.text(`Jifen Zhidu: ${systemText}`, 20, 54);
    }
    
    doc.setTextColor(0, 0, 0);
    
    // 課程表格數據
    const tableData = courses
        .filter(course => {
            const credits = parseFloat(course.credits);
            const gp = getGradePoint(course);
            return !isNaN(credits) && credits > 0 && gp !== null;
        })
        .map(course => {
            const credits = parseFloat(course.credits);
            const gp = getGradePoint(course);
            let gradeDisplay = '';
            
            if (course.scoreType === 'grade') {
                gradeDisplay = course.gradeValue;
            } else if (course.scoreType === 'score') {
                const score = parseFloat(course.scoreValue);
                const grades = gradingSystem[currentSystem];
                const found = grades.find(g => score >= g.min && score <= g.max);
                gradeDisplay = `${course.scoreValue} (${found ? found.grade : 'N/A'})`;
            }
            
            return [
                course.name || 'N/A',
                credits.toFixed(1),
                gradeDisplay,
                gp.toFixed(1),
                (credits * gp).toFixed(2)
            ];
        });
    
    // 如果沒有課程資料
    if (tableData.length === 0) {
        doc.setFontSize(12);
        doc.setFont("courier", "normal");
        doc.setTextColor(156, 163, 175);
        
        // 添加圖示
        doc.setFontSize(40);
        doc.text('[ ]', 105, 100, { align: 'center' });
        
        doc.setFontSize(14);
        doc.setTextColor(107, 114, 128);
        if (language === 'both') {
            doc.text('No course data available', 105, 120, { align: 'center' });
            doc.text('Shang wu kecheng ziliao', 105, 130, { align: 'center' });
        } else if (language === 'en') {
            doc.text(text[language].noData, 105, 125, { align: 'center' });
        } else {
            doc.text('Shang wu kecheng ziliao', 105, 125, { align: 'center' });
        }
        
        // 頁尾
        doc.setFontSize(7);
        doc.setTextColor(156, 163, 175);
        doc.setDrawColor(229, 231, 235);
        doc.setLineWidth(0.3);
        doc.line(20, 280, 190, 280);
        
        if (language === 'both') {
            doc.text('Generated by GPA Calculator', 105, 285, { align: 'center' });
            doc.text('You GPA Jisuanqi Shengcheng', 105, 289, { align: 'center' });
        } else if (language === 'en') {
            doc.text(`${text[language].footer}`, 105, 287, { align: 'center' });
        } else {
            doc.text('You GPA Jisuanqi Shengcheng', 105, 287, { align: 'center' });
        }
        
        const fileName = `GPA_Report_${new Date().toISOString().split('T')[0]}.pdf`;
        try {
            doc.save(fileName);
            showNotification(language === 'zh' ? 'PDF yi chenggong dachu!' : 'PDF exported successfully!', 'success');
        } catch (error) {
            console.error('PDF export error:', error);
            showNotification(language === 'zh' ? 'PDF dachu shibai' : 'PDF export failed', 'error');
        }
        return;
    }
    
    // 課程表格標題
    doc.setFontSize(14);
    doc.setFont("courier", "bold");
    doc.setTextColor(31, 41, 55);
    if (language === 'both') {
        doc.text('Course List / Kecheng Liebiao', 20, 67);
    } else if (language === 'en') {
        doc.text('Course List', 20, 67);
    } else {
        doc.text('Kecheng Liebiao', 20, 67);
    }
    
    // 繪製課程表格
    let tableHeaders;
    if (language === 'both') {
        tableHeaders = [[
            'Course Name\nKecheng Mingcheng', 
            'Credits\nXuefen', 
            'Grade\nChengji', 
            'GP\nJidian', 
            'Weighted\nJiaquan Fenshu'
        ]];
    } else if (language === 'en') {
        tableHeaders = [[
            text[language].courseName,
            text[language].credits,
            text[language].grade,
            text[language].gp,
            text[language].weighted
        ]];
    } else {
        tableHeaders = [[
            'Kecheng',
            'Xuefen',
            'Chengji',
            'Jidian',
            'Jiaquan'
        ]];
    }
    
    doc.autoTable({
        startY: 72,
        head: tableHeaders,
        body: tableData,
        theme: 'striped',
        headStyles: {
            fillColor: [59, 130, 246],
            textColor: [255, 255, 255],
            fontStyle: 'bold',
            halign: 'center',
            fontSize: language === 'both' ? 9 : 10,
            cellPadding: 5,
            lineWidth: 0.1,
            lineColor: [200, 200, 200]
        },
        columnStyles: {
            0: { cellWidth: 70, halign: 'left' },
            1: { halign: 'center', cellWidth: 25 },
            2: { halign: 'center', cellWidth: 30 },
            3: { halign: 'center', cellWidth: 25 },
            4: { halign: 'center', cellWidth: 35 }
        },
        styles: {
            fontSize: 10,
            cellPadding: 4,
            lineWidth: 0.1,
            lineColor: [220, 220, 220],
            font: "courier"
        },
        alternateRowStyles: {
            fillColor: [248, 250, 252]
        },
        margin: { left: 15, right: 15 }
    });
    
    // 計算結果
    let finalY = doc.lastAutoTable.finalY + 15;
    
    // 檢查是否需要新頁面
    if (finalY > 230) {
        doc.addPage();
        finalY = 20;
    }
    
    // 結果區塊標題
    doc.setFontSize(14);
    doc.setFont("courier", "bold");
    doc.setTextColor(31, 41, 55);
    if (language === 'both') {
        doc.text('Summary / Jisuan Jieguo', 20, finalY);
    } else if (language === 'en') {
        doc.text(`${text[language].summary}`, 20, finalY);
    } else {
        doc.text('Jisuan Jieguo', 20, finalY);
    }
    
    // 結果卡片
    const cardY = finalY + 5;
    
    // 總學分卡片
    doc.setFillColor(243, 244, 246);
    doc.roundedRect(15, cardY, 58, 32, 3, 3, 'F');
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(0.5);
    doc.roundedRect(15, cardY, 58, 32, 3, 3, 'S');
    
    doc.setFontSize(9);
    doc.setFont("courier", "normal");
    doc.setTextColor(107, 114, 128);
    if (language === 'both') {
        doc.text('Total Credits', 44, cardY + 8, { align: 'center' });
        doc.text('Zong Xuefen', 44, cardY + 13, { align: 'center' });
    } else if (language === 'en') {
        doc.text(text[language].totalCredits, 44, cardY + 10, { align: 'center' });
    } else {
        doc.text('Zong Xuefen', 44, cardY + 10, { align: 'center' });
    }
    doc.setFontSize(16);
    doc.setFont("courier", "bold");
    doc.setTextColor(31, 41, 55);
    doc.text(document.getElementById('totalCredits').textContent, 44, cardY + 24, { align: 'center' });
    
    // 加權總分卡片
    doc.setFillColor(243, 244, 246);
    doc.roundedRect(76, cardY, 58, 32, 3, 3, 'F');
    doc.setDrawColor(229, 231, 235);
    doc.roundedRect(76, cardY, 58, 32, 3, 3, 'S');
    
    doc.setFontSize(9);
    doc.setFont("courier", "normal");
    doc.setTextColor(107, 114, 128);
    if (language === 'both') {
        doc.text('Weighted Sum', 105, cardY + 8, { align: 'center' });
        doc.text('Jiaquan Zongfen', 105, cardY + 13, { align: 'center' });
    } else if (language === 'en') {
        doc.text(text[language].weightedSum, 105, cardY + 10, { align: 'center' });
    } else {
        doc.text('Jiaquan Zongfen', 105, cardY + 10, { align: 'center' });
    }
    doc.setFontSize(16);
    doc.setFont("courier", "bold");
    doc.setTextColor(31, 41, 55);
    doc.text(document.getElementById('weightedSum').textContent, 105, cardY + 24, { align: 'center' });
    
    // 平均 GPA 卡片 (藍色高亮)
    doc.setFillColor(239, 246, 255);
    doc.roundedRect(137, cardY, 58, 32, 3, 3, 'F');
    doc.setDrawColor(191, 219, 254);
    doc.setLineWidth(1);
    doc.roundedRect(137, cardY, 58, 32, 3, 3, 'S');
    
    doc.setFontSize(9);
    doc.setFont("courier", "normal");
    doc.setTextColor(59, 130, 246);
    if (language === 'both') {
        doc.text('Average GPA', 166, cardY + 8, { align: 'center' });
        doc.text('Pingjun Jidian', 166, cardY + 13, { align: 'center' });
    } else if (language === 'en') {
        doc.text(text[language].averageGPA, 166, cardY + 10, { align: 'center' });
    } else {
        doc.text('Pingjun Jidian', 166, cardY + 10, { align: 'center' });
    }
    doc.setFontSize(18);
    doc.setFont("courier", "bold");
    doc.setTextColor(37, 99, 235);
    doc.text(document.getElementById('averageGPA').textContent, 166, cardY + 24, { align: 'center' });
    
    // 頁尾
    doc.setFontSize(7);
    doc.setFont("courier", "normal");
    doc.setTextColor(156, 163, 175);
    
    // 添加分隔線
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(0.3);
    doc.line(20, 280, 190, 280);
    
    if (language === 'both') {
        doc.text('Generated by GPA Calculator', 105, 285, { align: 'center' });
        doc.text('You GPA Jisuanqi Shengcheng', 105, 289, { align: 'center' });
    } else if (language === 'en') {
        doc.text(`${text[language].footer}`, 105, 287, { align: 'center' });
    } else {
        doc.text('You GPA Jisuanqi Shengcheng', 105, 287, { align: 'center' });
    }
    
    // 顯示成功訊息
    const fileName = `GPA_Report_${new Date().toISOString().split('T')[0]}.pdf`;
    
    try {
        doc.save(fileName);
        
        // 顯示成功提示
        showNotification(language === 'zh' ? 'PDF yi chenggong dachu!' : 'PDF exported successfully!', 'success');
    } catch (error) {
        console.error('PDF export error:', error);
        showNotification(language === 'zh' ? 'PDF dachu shibai, qing chongshi' : 'PDF export failed, please try again', 'error');
    }
}

// 顯示通知訊息
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 px-6 py-3 rounded-xl shadow-lg text-white font-semibold text-sm z-50 fade-in ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    notification.textContent = message;
    notification.style.animation = 'fadeIn 0.3s ease-in-out';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease-in-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
