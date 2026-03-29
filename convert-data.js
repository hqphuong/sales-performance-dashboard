import csv from 'csvtojson';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Đường dẫn tới file CSV 
const csvFilePath = path.join(__dirname, 'sales_data_sample.csv');

// 2. Nơi bạn muốn lưu file JSON kết quả (nên để trong thư mục src/data)
const jsonOutputPath = path.join(__dirname, 'src', 'data', 'salesData.json');

// Đảm bảo thư mục src/data tồn tại
if (!fs.existsSync(path.join(__dirname, 'src', 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'src', 'data'), { recursive: true });
}

console.log('--- Đang bắt đầu chuyển đổi CSV sang JSON ---');

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    // 3. Thực hiện ánh xạ (mapping) dữ liệu 
    // Trong file convert-data.js, phần mappedData sửa lại:
    const mappedData = jsonObj.map(item => ({
    year: item.YEAR_ID === '2003' ? 2022 : item.YEAR_ID === '2004' ? 2023 : 2024,
    month: getMonthName(item.MONTH_ID),
    monthOrder: parseInt(item.MONTH_ID),
    category: item.PRODUCTLINE, // Thêm dòng này để lấy phân loại (Cars, Planes...)
    sales: parseFloat(item.SALES)
    }));

    // 4. Ghi file JSON
    fs.writeFileSync(jsonOutputPath, JSON.stringify(mappedData, null, 2));
    console.log(`✅ Thành công! File đã được lưu tại: ${jsonOutputPath}`);
  })
  .catch(err => {
    console.error('❌ Lỗi:', err);
  });

// Hàm hỗ trợ đổi số tháng sang tên tháng
function getMonthName(monthId) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[parseInt(monthId) - 1];
}