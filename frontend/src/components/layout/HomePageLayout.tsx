import styles from "./HomePageLayout.module.css";

type HomePageLayoutProps = {
    challengeForm: React.ReactNode;
    challenges: React.ReactNode;
};

const HomePageLayout = ({ challengeForm, challenges }: HomePageLayoutProps) => {
    return (
        <div className={styles.container}>
            {challengeForm}
            <div className={styles.divider} />
            {challenges}
        </div>
    );
};

export default HomePageLayout;
