import { PrismaClient } from '@prisma/client';
import * as path from 'path';

const readXlsxFile = require('read-excel-file/node');

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, './data/data.xlsx');
  readXlsxFile(filePath).then((rows) => {
    rows.forEach(async (row, index) => {
      if (index == 0) {
        return;
      }
      const answers = [];
      if (row[4] === 'Tak') {
        answers.push({
          text: 'Tak',
          isCorrect: true,
        });
        answers.push({
          text: 'Nie',
          isCorrect: false,
        });
      } else if (row[4] === 'Nie') {
        answers.push({
          text: 'Nie',
          isCorrect: true,
        });
        answers.push({
          text: 'Tak',
          isCorrect: false,
        });
      } else if (row[4] === 'A') {
        answers.push({
          text: row[2],
          isCorrect: true,
        });
        answers.push({
          text: row[3],
          isCorrect: false,
        });
        answers.push({
          text: row[4],
          isCorrect: false,
        });
      } else if (row[4] === 'B') {
        answers.push({
          text: row[3],
          isCorrect: true,
        });
        answers.push({
          text: row[2],
          isCorrect: false,
        });
        answers.push({
          text: row[4],
          isCorrect: false,
        });
      } else if (row[4] === 'C') {
        answers.push({
          text: row[4],
          isCorrect: true,
        });
        answers.push({
          text: row[2],
          isCorrect: false,
        });
        answers.push({
          text: row[3],
          isCorrect: false,
        });
      }
      await prisma.question.create({
        data: {
          text: row[0],
          assetName: row[5] || null,
          answers: {
            create: answers,
          },
          categories: row[6].split(','),
        },
      });
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
