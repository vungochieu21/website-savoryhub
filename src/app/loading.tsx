import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.chaseStage}>
        {/* Pizza - Chạy đầu tiên */}
        <div className={styles.foodRunner} style={{ animationDelay: '0s, 0s' }}>
          🍕<span className={styles.smoke}>💨</span>
        </div>
        
        {/* Burger - Chạy ngay lập tức nhưng ở vị trí sau Pizza 0.4s */}
        <div className={styles.foodRunner} style={{ animationDelay: '0s, -0.4s' }}>
          🍔<span className={styles.smoke}>💨</span>
        </div>
        
        {/* Taco - Chạy ngay lập tức nhưng ở vị trí sau Burger (cách Pizza 0.8s) */}
        <div className={styles.foodRunner} style={{ animationDelay: '0s, -0.8s' }}>
          🌮<span className={styles.smoke}>💨</span>
        </div>
      </div>
      
      <div className={styles.text}>
        Đang chuẩn bị món ăn...
      </div>
    </div>
  );
}