import NavigationDrawerButton from '../ui/NavigationDrawerButton'
import styles from './NavigationDrawer.module.css'

const NavigationDrawer = () => {
  return (
    <div className={styles.container}>
      <NavigationDrawerButton>
        Home
      </NavigationDrawerButton>
      <NavigationDrawerButton>
        Game
      </NavigationDrawerButton>
      <NavigationDrawerButton>
        Board
      </NavigationDrawerButton>
    </div>
  )
}

export default NavigationDrawer
