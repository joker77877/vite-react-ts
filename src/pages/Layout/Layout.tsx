const aa = () => {
    return (
        <div>
            <Button
                onClick={() => {
                    b.a = 1;
                }}
            >
                Break the world
            </Button>
            <Outlet />
        </div>
    );
};

export default aa;
