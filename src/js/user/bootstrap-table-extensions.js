$.extend($.fn.bootstrapTable.defaults, {
  classes: 'table table-fixed table-hover text-nowrap',
  buttonsClass: 'primary-soft',
  formatNoMatches: () => 'No matching items found... 😕',
  iconsPrefix: 'bi',
  paginationHAlign: 'none justify-content-center justify-content-sm-end my-4',
  paginationLoop: false,
  paginationParts: ['pageList'],
  paginationPreText: '<i class="bi bi-chevron-left fs-base"></i>',
  paginationNextText: '<i class="bi bi-chevron-right fs-base"></i>',
  paginationSelector: undefined,
  paginationSuccessivelySize: 3,
  searchAccentNeutralise: true,
  showCustomViewSwitcher: true,
  sortReset: true,
  theadClasses: 'table-light',
  trimOnSearch: false,
  undefinedText: '',
})

$.extend($.fn.bootstrapTable.columnDefaults, {
  searchable: false,
  searchFormatter: false,
  valign: 'middle',
})

$.extend($.fn.bootstrapTable.defaults.icons, {
  // customViewOff: 'bi-grid-fill',
  // customViewOn: 'bi-list-ul',
})

$.BootstrapTable = class extends $.BootstrapTable {

  initConstants () {
    super.initConstants()
    this.constants.html.pagination = ['<ul class="pagination pagination-primary-soft d-inline-block d-md-flex rounded%s">', '</ul>']
  }

  initToolbar() {
    super.initToolbar()
    if (this.options.customView && this.options.showCustomViewSwitcher) {
      this.$toolbar.append(
        $('<ul>', {
          'class': 'nav nav-pills nav-pills-dark',
          'role': 'tablist',
        }).append([
          $('<li>', {
            'class': 'nav-item',
          }).append(
            $('<button>', { 
              'type': 'button',
              'class': 'nav-link rounded-start rounded-0 active',
              'style': 'line-height: 1.625rem;',
              'data-bs-toggle': 'tab',
              'role': 'tab',
              'aria-selected': 'true',
              'html': '<i class="bi bi-list-ul fa-fw"></i>',
              click: () => { this.hideCustomView() }
            })
          ),
          $('<li>', {
            'class': 'nav-item',
          }).append(
            $('<button>', {
              'type': 'button',
              'class': 'nav-link rounded-end rounded-0',
              'style': 'line-height: 1.625rem;',
              'data-bs-toggle': 'tab',
              'role': 'tab',
              'aria-selected': 'false',
              'html': '<i class="bi bi-grid-fill fa-fw"></i>',
              click: () => { this.showCustomView() }
            })
          ),
        ])
      )
    }
  }

  initPagination() {
    super.initPagination()

    const opts = this.options
  
    // Return if pagination is disabled.
    if (!opts.pagination) {
      return
    }

    // On small devices hide some page links.
    const $pageItems = this.$pagination.find('.page-item')
    $pageItems.not('.page-next, .page-pre').addClass('d-none d-sm-block')
    $pageItems.filter('.active').after(`<li class="page-item disabled d-sm-none"><span class="page-link text-body">${opts.pageNumber} / ${this.totalPages}</span></li>`)

    if (opts.paginationSelector) {
      this.$pagination.appendTo($(opts.paginationSelector))
    }
  }

  hideCustomView() {
    if (this.customViewDefaultView) {
      this.toggleCustomView()
      this.$container.closest('.card-disabled').removeClass('card-disabled').addClass('card border')
      this.$container.closest('.table-responsive-disabled').removeClass('table-responsive-disabled').addClass('table-responsive')
    }
  }

  showCustomView() {
    if (!this.customViewDefaultView) {
      this.toggleCustomView()
      this.$container.closest('.card').removeClass('card border').addClass('card-disabled')
      this.$container.closest('.table-responsive').removeClass('table-responsive').addClass('table-responsive-disabled')
    }
  }

}
