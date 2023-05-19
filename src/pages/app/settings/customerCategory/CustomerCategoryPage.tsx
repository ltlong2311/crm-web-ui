import { CustomerCategoryManagementModule } from '@modules';
import { StyedSubPage } from '@components';

export const CustomerCategoryPage = () => {
  return (
    <StyedSubPage className="customer-category-page">
      <div className="page__section">
        <CustomerCategoryManagementModule />
      </div>
    </StyedSubPage>
  );
};


