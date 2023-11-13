import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExcelService {
  async uploadQAExcel(file: Express.Multer.File) {
    // 初始化一個workbook
    const workbook = new ExcelJS.Workbook();
    // 讀取上傳文件
    await workbook.xlsx.readFile(file.path);
    // 獲取workbook的第一個sheet
    const worksheet_qa = workbook.getWorksheet('分類');
    // 初始化一個data 用來返回取出的資料
    const data = [];
    const startColumnIndex = 1; // 起始欄的索引，這裡從第一欄開始
    const endColumnIndex = 3; // 結束欄的索引，這裡結束於第六欄
    const columnHeaders = ['class', 'role', 'qa'];
    worksheet_qa.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        return;
      }
      const rowData = {};
      // 讀取一行中的每一個格子
      // row.eachCell((cell, colNumber) => {
      //   rowData[columnHeaders[colNumber - 1]] = cell.value;
      // });
      for (
        let colNumber = startColumnIndex;
        colNumber <= endColumnIndex;
        colNumber++
      ) {
        const columnIndex = colNumber - startColumnIndex;
        const cell = row.getCell(colNumber);
        rowData[columnHeaders[columnIndex]] = cell ? cell.value : null;
      }
      data.push(rowData);
    });
    // console.log(data, 'data');

    // 整理我要的分類列表
    const classArray = data.map((item) => item.class);
    // 使用 filter 和 includes 去除重複的 class
    const uniqueClassArray = classArray.filter(
      (value, index, self) => self.indexOf(value) === index && value !== null,
    );
    // console.log(uniqueClassArray);

    const newCalssArr = uniqueClassArray.map((item, index) => {
      return { id: 'C' + (index + 1), class: item };
    });

    // 整理QA列表
    let newQAId = 1;

    const newQAArr = data.reduce((acc, cur) => {
      if (cur.class) {
        acc.push({
          id: `A${newQAId}`,
          class: cur.class,
          question: cur.qa,
          answer: '',
        });
        newQAId++;
      } else {
        const lastItem = acc[acc.length - 1];
        // lastItem.answer += '\n' + cur.qa;
        if (cur.role === '客服') {
          lastItem.answer = cur.qa;
        } else {
          // 如果角色是null
          lastItem.answer += '\n' + cur.qa;
        }
      }
      return acc;
    }, []);
    // ----------------新增加入問題給語言模型
    let newQId = 1;
    const newQArr = data.reduce((acc, cur) => {
      if (cur.class) {
        acc.push({
          id: `Q${newQId}`,
          class: cur.class,
          question: cur.qa,
          answer: '',
        });
        newQId++;
      } else {
        const lastItem = acc[acc.length - 1];
        // lastItem.answer += '\n' + cur.qa;
        if (cur.role === '客服') {
          lastItem.answer = cur.qa;
        } else {
          // 如果角色是null
          lastItem.answer += '\n' + cur.qa;
        }
      }
      return acc;
    }, []);
    // ----------------新增加入問題給語言模型
    // console.log(newArr);
    console.log('拿到excel資料');
    return { newQAArr, newCalssArr, newQArr };
  }
}
