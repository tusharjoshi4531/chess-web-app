import styles from "./MoveContainer.module.css"

type MoveContainerProps = {
  moves: string[],
}

const MoveContainer = ({moves}: MoveContainerProps) => {

  let movesContent = "";

  moves.forEach((move, index) => movesContent += `${index+1}.${move} `);

  return (
    <div className={styles.container}>
      <span>Moves:</span>
      <div className={styles.moveContainer}>
        {movesContent}
      </div>
    </div>
  )
}

export default MoveContainer
