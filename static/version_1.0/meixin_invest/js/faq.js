function toggleChevron(e) {
    $(e.target)
            .prev('.panel-heading')
            .find("i.indicator")
            .toggleClass('glyphicon-triangle-right glyphicon-triangle-bottom');
}
$('#faq-general-accordion, #faq-invest-accordion, #faq-product-accordion, #faq-capital-accordion, #faq-tax-accordion').on('hidden.bs.collapse', toggleChevron);
$('#faq-general-accordion, #faq-invest-accordion, #faq-product-accordion, #faq-capital-accordion, #faq-tax-accordion').on('shown.bs.collapse', toggleChevron);