# CHIA TASK

- ĐỌT: Biography, Gallery, Header, HistoryOfSite, Map, MemberList
- PHÁT: FOOTER
- KHANG: HEADER

# Cách setup project

```bash
# Clone project từ GitHub
git clone https://github.com/DATOT/LCPBNguyenSinhSac10T1.git
cd LCPBNguyenSinhSac10T1
# Cài dependencies
npm install
# Chạy thử
npm run dev
```

- Nếu thấy giao diện => OK
- Nếu không:
  - Kiểm tra đã npm install chưa1
  - Thử:

```bash
rmdir node_modules
npm install
```

## Hướng dẫn dùng git:

Git là công cụ giúp quản lý code, lưu lại lịch sử thay đổi và làm việc nhóm hiệu quả. Repo (repository) là nơi lưu trữ code của project (nằm trên GitHub).

1. Update code lên repo
   Khi bạn đã chỉnh sửa code và muốn lưu lại + gửi lên GitHub:

```bash
git add --all
git commit -m "Mô tả thay đổi"
git push origin main
```

Giải thích:

- `git add --all` → chọn tất cả file đã thay đổi để chuẩn bị commit
- `git commit` → lưu lại thay đổi vào lịch sử (local)
- `git push` → đẩy code lên repo (GitHub)

**Nên commit từng phần nhỏ thay vì gom quá nhiều thay đổi vào 1 commit.**

2. Lấy dữ liệu mới từ repo
   Trước khi bắt đầu code, luôn cập nhật code mới nhất:

```bash
git pull origin main
```

**Giải thích**:

- Lấy code mới nhất từ branch main
- Tránh bị conflict khi làm việc nhóm

## Cài dependencies (chỉ cần làm 1 lần)

```bash
npm install
```

**Giải thích:**

- Cài các thư viện cần thiết cho project
- Sau khi clone repo về máy, bắt buộc phải chạy bước này

## Chạy project

Khởi chạy server local để test project

```sh
npm run dev
```

### Nếu lỗi, thử:

```sh
rmdir node_modules
npm install
```

# QUY TẮC CHUNG

- Luôn git pull trước khi bắt đầu code
- Không push code bị lỗi
- Viết commit message rõ ràng:
  - "fix header bug" cái này ok
  - "update" cái này không ok do không cụ thể

- Format code trước khi commit
- Không push file rác:
  - node_modules/
  - .env
  - file build (`dist/`, `build/`)

## Tránh conflict

> _Conflict xảy ra khi nhiều người sửa cùng 1 chỗ trong file_

**Cách hạn chế:**

- Không sửa cùng 1 file cùng lúc
- Pull code thường xuyên
  **Nếu conflict:**

```bash
git pull
# sửa conflict
git add .
git commit -m "resolve conflict"
```

- Vị trí phần mọi người làm sẽ ở trong src/sections
- Những ảnh hay dữ liệu chung nên lưu ở public/assets

## Tips:

- Xem trạng thái:

```bash
git status
```

- Xem lịch sử commit:

```bash
git log
```

Ngoài ra trên vscode nên tải gitlens
