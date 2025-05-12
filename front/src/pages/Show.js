import React from 'react';

class Show extends React.Component {

    render(){
        return(
            <section id="hero" class="d-flex align-items-center justify-content-center">
                <div class="container" data-aos="fade-up">

                <div class="row justify-content-center">
                    <div class="col-xl-6 col-lg-8">
                    <h1>PREDICT TOOLS</h1>
                    <h2>H2O purity & ADP stock</h2>
                    </div>
                </div>

                <div class="row gy-4 mt-5 justify-content-center">
                    <div class="col-xl-2 col-md-4">
                    <div class="icon-box">
                        <i class="ri-bar-chart-box-line"></i>
                        <h3><a href="/regression">Regression</a></h3>
                    </div>
                    </div>
                    <div class="col-xl-2 col-md-4">
                    <div class="icon-box">
                        <i class="ri-database-2-line"></i>
                        <h3><a href="/classification">Classification</a></h3>
                    </div>
                    </div>
                </div>

                </div>
            </section>
        );
    }

} 

export default Show;