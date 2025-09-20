function LoggedInHeader() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/admin">ECOM APP</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/admin">products</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/admin/create">new product</a>
                            </li>
                        </ul>
                        <div className="d-flex" role="search">
                            Welcome Admin! <button className="btn btn-warning">Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default LoggedInHeader;