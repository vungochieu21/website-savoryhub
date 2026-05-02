import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.chaseStage}>
        {/* Pizza */}
        <div className={styles.foodRunner} style={{ animationDelay: '0s, 0s' }}>
          🍕<span className={styles.smoke}>💨</span>
        </div>
        
        {/* Burger */}
        <div className={styles.foodRunner} style={{ animationDelay: '0s, -0.4s' }}>
          🍔<span className={styles.smoke}>💨</span>
        </div>
        
        {/* Taco */}
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