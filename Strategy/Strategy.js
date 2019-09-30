// 等级与成绩的映射关系 
const levels = {
  S : 100,
  A : 90,
  B : 80,
  C : 70,
  D : 60
}

// 一组策略
let gradeBaseOnLevel = {
  S: () => {
    return `当前成绩为${levels['S']}`
  },
  A: () => {
    return `当前成绩为${levels['A']}`
  },
  B: () => {
    return `当前成绩为${levels['B']}`
  },
  C: () => {
    return `当前成绩为${levels['C']}`
  },
  D: () => {
    return `当前成绩为${levels['D']}`
  },
}

// 调用方法
function getStudentScore(level) {
  return levels[level] ? gradeBaseOnLevel[level]() : 0;
}

console.log(getStudentScore('S')); // 当前成绩为100
console.log(getStudentScore('A')); // 当前成绩为90
console.log(getStudentScore('B')); // 当前成绩为80
console.log(getStudentScore('C')); // 当前成绩为70
console.log(getStudentScore('D')); // 当前成绩为60