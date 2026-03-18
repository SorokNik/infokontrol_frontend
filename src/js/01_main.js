document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector(".header__hamburger"),
        header = document.querySelector(".header"),
        questionPoints = document.querySelectorAll(".questions__point"),
        questionItems = document.querySelectorAll(".questions__item"),
        tabs = document.querySelectorAll('.order-form__number-type'),
        input = document.querySelector('.order-form__input');

    hamburger.addEventListener("click", () => {
        header.classList.toggle("open");
        document.body.classList.toggle("open");
    });

    questionPoints.forEach((questionPoint, i) => {
        questionPoint.addEventListener("click", () => {
            questionItems[i].classList.toggle("open");
        })
    });

    // переключалки для заказать отчёт
    Array.from(tabs).forEach((tab) => {
        tab.addEventListener('click', (e) => {
            Array.from(tabs).forEach((tab) => {
                tab.classList.remove('active');
            });
            tab.classList.add('active')
            input.setAttribute('placeholder', tab.getAttribute('data-placeholder'))
        });
    })
    if (tabs.length > 0) {
        document.querySelector('.order-form__number-type.active').click();
    }


    // Таймер

    const timerEls = document.querySelectorAll('.timer');
    const loaderTimer = document.querySelector('.loader-timer');

    if (timerEls.length > 0) {
        timerEls.forEach((el) => {
            startTimer(15*60, el)
        });
    }

    // if (loaderTimer) {
    //     startTimer(10, loaderTimer, 'SS', true);
    // }

    function startTimer(durationInSeconds, timerEl, format = 'MM:SS', isUpdate = false) {
        if (!timerEl) return;

        let remaining = durationInSeconds;

        const intervalId = setInterval(() => {
            let text = '';

            if (format === 'MM:SS') {
                const minutes = Math.floor(remaining / 60);
                const seconds = remaining % 60;

                text = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }

            if (format === 'SS') {
                text = remaining.toString();
            }

            timerEl.textContent = text;

            if (remaining <= 0) {
                clearInterval(intervalId);
                if (isUpdate) {
                    location.reload();
                }
                return;
            }

            remaining--;
        }, 1000);
    }

    const airplaneResultsBlocks = document.querySelectorAll('.airplane-results.results._airplane');

    const initAirplaneResults = (airplaneResultsBlocks) => {
        airplaneResultsBlocks.forEach((airplaneResultsBlock) => {
            airplaneResultsBlock.addEventListener('click', (event) => {
                const timetableItem = event.target.closest('.timetables-table-item[data-block]');
                const hideButton = event.target.closest('.timetables-detail-results__hide');

                if (timetableItem) {
                    const blockId = timetableItem.dataset.block;
                    const targetDetails = airplaneResultsBlock.querySelector(`.timetables-detail-results[data-id="${blockId}"]`);

                    if (!targetDetails) {
                        return;
                    }

                    const activeItem = airplaneResultsBlock.querySelector('.timetables-table-item._active');
                    const activeDetails = airplaneResultsBlock.querySelector('.timetables-detail-results._active');
                    const isAlreadyActive = timetableItem.classList.contains('_active');

                    if (activeItem) {
                        activeItem.classList.remove('_active');
                    }

                    if (activeDetails) {
                        activeDetails.classList.remove('_active');
                    }

                    if (!isAlreadyActive) {
                        timetableItem.classList.add('_active');
                        targetDetails.classList.add('_active');
                    }

                    return;
                }

                if (hideButton) {
                    const currentDetails = hideButton.closest('.timetables-detail-results');

                    if (!currentDetails) {
                        return;
                    }

                    const blockId = currentDetails.dataset.id;
                    const activeItem = airplaneResultsBlock.querySelector(`.timetables-table-item[data-block="${blockId}"]`);

                    if (activeItem) {
                        activeItem.classList.remove('_active');
                    }
                    currentDetails.classList.remove('_active');
                }
            });
        });
    }

    initAirplaneResults(airplaneResultsBlocks)

    const deleteButtons = document.querySelectorAll('.reports-list__button-delete');
    const deleteModal = document.querySelector('.modal');

    if (deleteButtons.length > 0 && deleteModal) {
        const modalReportName = deleteModal.querySelector('[data-modal-report-name]');
        const modalDeleteLink = deleteModal.querySelector('[data-modal-delete-link]');
        const modalCloseButton = deleteModal.querySelector('[data-modal-close]');
        let lastFocusedDeleteButton = null;

        const closeDeleteModal = () => {
            if (deleteModal.contains(document.activeElement)) {
                document.activeElement.blur();
            }

            deleteModal.classList.remove('is-open');
            deleteModal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open');

            if (lastFocusedDeleteButton) {
                lastFocusedDeleteButton.focus();
            }
        };

        const openDeleteModal = (reportName, deleteHref) => {
            if (modalReportName) {
                modalReportName.textContent = reportName || '';
            }

            if (modalDeleteLink) {
                modalDeleteLink.setAttribute('href', deleteHref || '#');
            }

            deleteModal.classList.add('is-open');
            deleteModal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');

            if (modalCloseButton) {
                modalCloseButton.focus();
            }
        };

        deleteButtons.forEach((button) => {
            button.addEventListener('click', () => {
                lastFocusedDeleteButton = button;
                const reportName = button.dataset.reportName;
                const deleteHref = button.dataset.hrefDelete;

                openDeleteModal(reportName, deleteHref);
            });
        });

        if (modalCloseButton) {
            modalCloseButton.addEventListener('click', closeDeleteModal);
        }

        deleteModal.addEventListener('click', (event) => {
            if (!event.target.closest('.modal__content')) {
                closeDeleteModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && deleteModal.classList.contains('is-open')) {
                closeDeleteModal();
            }
        });
    }




    

})
