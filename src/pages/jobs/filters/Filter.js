import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import {ScrollView, Text, View} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {LOADER} from 'src/actions/action';
import {APPLY_JOB_FILTERS} from 'src/actions/jobs';
import CustomButton from 'src/components/button/CustomButton';
import Header from 'src/components/header/Header';
import RadioGroup from 'src/components/radio-group/RadioGroup';
import {Icon} from 'src/Icon';
import {
  budgetRanges,
  fetchCategories,
  fetchProjectTimeline,
  fetchSubCategories,
} from 'src/services/http.service';
import colors from 'src/styles/texts/colors';
import styles from './Filters.styles';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      selectedData: [],
      currency: 'sar',
      isModalVisible: false,
      subCategories: [],
      categoryId: undefined,
      sections: [
        {
          id: 0,
          title: this.props.t('filters.sort'),
          data: [
            {
              id: 0,
              name: this.props.t('filters.newest'),
              tag: 'newest',
            },
            {
              id: 1,
              name: this.props.t('filters.oldest'),
              tag: 'oldest',
            },
            {
              id: 2,
              name: this.props.t('filters.highestPrice'),
              tag: 'highest_price',
            },
            {
              id: 3,
              name: this.props.t('filters.lowestPrice'),
              tag: 'lowest_price',
            },
            {
              id: 4,
              name: this.props.t('filters.longTimeline'),
              tag: 'long_timeline',
            },
            {
              id: 5,
              name: this.props.t('filters.shortTimeline'),
              tag: 'short_timeline',
            },
          ],
        },
        {
          id: 1,
          title: this.props.t('filters.numberOfProposals'),
          data: [
            {
              id: 0,
              name: this.props.t('filters.anyNoOfProposals'),
              tag: [0, 0],
            },
            {
              id: 1,
              name: '5 to 10',
              tag: [5, 10],
            },
            {
              id: 2,
              name: '10 to 20',
              tag: [10, 20],
            },
            {
              id: 3,
              name: '20 to 50',
              tag: [20, 50],
            },
          ],
        },
      ],
    };
  }
  // {
  //   id: 2,
  //   title: 'Currency',
  //   data: [
  //     {
  //       id: 0,
  //       name: 'SR',
  //       tag: 'sar',
  //     },
  //     {
  //       id: 1,
  //       name: 'USD',
  //       tag: 'usd',
  //     },
  //   ],
  // },
  getBudgetRanges = () => {
    budgetRanges()
      .then((res) => {
        let tempBudget = [];
        tempBudget = res.data.data.budget_ranges.map((x) => ({
          id: x.id,
          name:
            x.sar.to === null
              ? `>${x.sar.from} SR`
              : x.sar.from === null
              ? `<${x.sar.to} SR`
              : `${x.sar.from}-${x.sar.to} SR`,
          nameUSD:
            x.usd.to === null
              ? `>${x.usd.from} USD`
              : x.usd.from === null
              ? `<${x.usd.to} USD`
              : `${x.usd.from}-${x.usd.to} USD`,
          tag: [x.id],
          nameSR:
            x.sar.to === null
              ? `>${x.sar.from} SR`
              : x.sar.from === null
              ? `<${x.sar.to} SR`
              : `${x.sar.from}-${x.sar.to} SR`,
        }));

        this.setState({
          sections: [
            ...this.state.sections,
            {id: 3, title: 'Budget', data: tempBudget},
          ],
        });

        this.projectTimeline();
      })
      .catch((err) => {
        console.error('couldnot get budget range err', err);
      });
  };

  projectTimeline = () => {
    fetchProjectTimeline().then((res) => {
      let tempTimeline = res?.data?.data.project_timelines?.map((x) => ({
        id: x.id,
        name: x.title,
        tag: [x.id],
      }));

      this.setState({
        sections: [
          ...this.state.sections,
          {id: 4, title: 'Project Length', data: tempTimeline},
        ],
      });
      this.getCategories();
    });
  };

  getCategories = () => {
    fetchCategories()
      .then((res) => {
        let tempCategories = res.data?.data?.categories?.data?.map((x) => ({
          id: x.id,
          name: x.name,
        }));

        this.setState({
          sections: [
            ...this.state.sections,
            {id: 5, title: 'Narrow By', data: tempCategories},
          ],
        });
        this.setFilter();
      })
      .catch((err) => {
        console.error('Couldnot fetch categories', err);
      });
  };

  async componentDidMount() {
    this.props.dispatch(LOADER(false));

    await this.getBudgetRanges();
  }
  setFilter = () => {
    const {currentFilters} = this.props;
    let temp = [];
    if (currentFilters[0].sort !== 'newest')
      temp.push({
        dataId: 0,
        selection: this.state.sections[0].data.find(
          (x) => x.tag === currentFilters[0].sort,
        ),
      });
    if (currentFilters[0].proposal_count !== undefined)
      temp.push({
        dataId: 1,
        selection: this.state.sections[1].data.find(
          (x) =>
            x.tag.toString() === currentFilters[0].proposal_count.toString(),
        ),
      });
    if (currentFilters[0].bdRange !== undefined) {
      temp.push({
        dataId: 3,
        selection: this.state.sections[2].data.find(
          (x) => x.id === currentFilters[0].bdRange[0],
        ),
      });
      // temp.push({
      //   dataId: 2,
      //   selection: this.state.sections[1].data[0],
      // });
    }
    if (currentFilters[0].timeline !== undefined)
      temp.push({
        dataId: 4,
        selection: this.state.sections[3].data.find(
          (x) => x.id === currentFilters[0].timeline[0],
        ),
      });
    if (currentFilters[0].category !== undefined) {
      temp.push({
        dataId: 5,
        selection: this.state.sections[4].data.find(
          (x) => x.id === currentFilters[0].categoryId,
        ),
      });
      temp.map((y) => {
        if (y.dataId === 5) {
          y.selection.id = currentFilters[0].category;
        }
      });
    }
    this.setState({selectedData: temp});
    // console.log('object', temp);
    // console.log('temp', currentFilters);
  };
  getSubCategories = (id) => {
    fetchSubCategories(id)
      .then((res) => {
        this.setState({subCategories: res.data.data?.sub_categories?.data});
      })
      .catch((err) => {
        console.error('Couldnot fetch sub categories', err);
      });
  };

  handleCategories = (id) => {
    // this.getSubCategories(id);
    // this.setState({isModalVisible: !this.state.isModalVisible});
    this.setState({categoryId: id});
    this.props.navigation.navigate('ShowSubCategories', {id: id});
  };

  _renderHeader = (section) => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionText}>{section.title}</Text>
        {this.state.selectedData.map((x, i) => {
          return (
            x.dataId === section.id && (
              <Text
                style={{
                  marginEnd: 10,
                  textAlignVertical: 'center',
                  color: colors.appGray,
                }}
                key={i}>
                {x.selection.name}
              </Text>
            )
          );
        })}
        {this.state.activeSections[0] === section.id ? (
          <Icon name="arrow-down" size={16} color={colors.appViolet} />
        ) : (
          <Icon name="arrow-next" size={16} color={colors.appViolet} />
        )}
      </View>
    );
  };

  _renderContent = (section) => {
    return (
      <View style={styles.content}>
        {section.id !== 5 ? (
          <RadioGroup
            data={section}
            onSelect={this.handleRadioSelect}
            selectedFromRedux={this.props.currentFilters}
          />
        ) : (
          section?.data?.map((x) => (
            <CustomButton
              handlePress={() => this.handleCategories(x.id)}
              key={x.id}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: colors.defaultWhite,
                height: 60,
                // paddingHorizontal: 10,
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: colors.appGray1,
              }}>
              <Text style={{fontSize: 15}}>{x.name}</Text>
              <Icon name="arrow-next" size={18} color={colors.appViolet} />
            </CustomButton>
          ))
        )}
      </View>
    );
  };

  _updateSections = (activeSections) => {
    this.setState({activeSections});
  };

  handleRadioSelect = (item) => {
    this.setState({selectedData: [...this.state.selectedData, item]});
    if (this.state.selectedData.find((x) => x.dataId === item.dataId)) {
      let dummy = this.state.selectedData.filter(
        (y) => y.dataId !== item.dataId,
      );
      dummy.push(item);
      this.setState({selectedData: dummy});
    }

    let temp = this.state.sections;
    if (item?.selection?.tag === 'usd') {
      if (temp.find((x) => x.id === 3)) {
        temp[temp.findIndex((x) => x.id === 3)].data.map((z) => {
          z.name = z.nameUSD;
        });
      }
    } else if (item?.selection?.tag === 'sar') {
      if (temp.find((x) => x.id === 3)) {
        temp[temp.findIndex((x) => x.id === 3)].data.map((z) => {
          z.name = z.nameSR;
        });
      }
    }
  };

  applyFilters = () => {
    console.log('selected filter', this.state.selectedData);
    if (this.state.selectedData.length === 0)
      alert('Please apply atleast one filter first');
    else if (
      this.state.selectedData.length === 0 &&
      this.state.selectedData.filter((x) => x.dataId === 3).length === 0
    ) {
      alert('Please select budget ');
    } else {
      const {currentFilters} = this.props;
      let sort = this.state.selectedData.filter((x) => x.dataId === 0);
      sort = sort[0]?.selection.tag;
      let proposal_count = this.state.selectedData.filter(
        (y) => y.dataId === 1,
      );
      let bdRange = this.state.selectedData.filter((x) => x.dataId === 3);
      // console.log('bdR', bdRange);
      bdRange = bdRange[0]?.selection?.tag;
      let timeline = this.state.selectedData.filter((x) => x.dataId === 4);
      timeline = timeline[0]?.selection?.tag;
      let category = this.state.selectedData.filter((x) => x.dataId === 5);
      category = category[0]?.selection?.id;

      proposal_count = proposal_count[0]?.selection.tag;
      let filter_count = this.state.selectedData.length;
      if (this.state.selectedData.find((x) => x.dataId === 2)) {
        filter_count = filter_count - 1;
      }
      // console.log('ca', sort, bdRange, timeline, category, proposal_count);
      // this.props.dispatch(
      //   CURRENT_FILTERS({
      //     sort: sort,
      //     bdRange: bdRange,
      //     proposal_count: proposal_count,
      //     timeline: timeline,
      //     category: category,
      //   }),
      // );

      this.props.dispatch(
        APPLY_JOB_FILTERS({
          page: 1,
          sort_by: sort,
          proposal_count: proposal_count,
          budget: bdRange,
          project_timeline: timeline,
          categories_id: category,
          filterCount: null,
          clearFilter: false,
          categoryId:
            this.state.categoryId !== undefined && this.state.categoryId,
        }),
      );
      this.props.navigation.navigate('Jobs', {
        // sort_by: sort,
        // proposal_count: proposal_count,
        // budget: bdRange,
        // project_timeline: timeline,
        // categories_id: category,
        // filter_count: filter_count,
      });
      this.props.dispatch(LOADER(true));
    }
  };

  clearFilter = async () => {
    this.setState({selectedData: [], filter_count: 0, categoryId: ''});
    // let a = await this.props.dispatch(CLEAR_FILTERS());
    // console.log('cf', JSON.stringify(a, null, 2));

    this.props.dispatch(
      APPLY_JOB_FILTERS({
        page: 1,
        sort_by: 'newest',
        proposal_count: undefined,
        budget: undefined,
        project_timeline: undefined,
        categories_id: undefined,
        clearFilter: true,
        categoryId: undefined,
      }),
    );
    this.props.navigation.navigate('Jobs');
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.props.route?.params?.subCategory &&
        this.handleRadioSelect(this.props.route?.params?.subCategory);
    }
  }

  render() {
    const {t, currentFilters} = this.props;
    const {sections} = this.state;

    return (
      <>
        <Header
          cancelButton
          title={t('filters.filters')}
          notificationButton
          navigation={this.props.navigation}
        />
        <ScrollView style={styles.container}>
          <Accordion
            sections={sections}
            activeSections={this.state.activeSections}
            // renderSectionTitle={this._renderSectionTitle}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            onChange={this._updateSections}
          />
        </ScrollView>
        <View style={styles.footerButton}>
          <CustomButton
            style={{
              borderColor: colors.appBlue,
              width: 100,
              marginEnd: 20,
              flexDirection: 'row',
              // alignItem: 'center',
            }}
            handlePress={() => this.clearFilter()}
            mode={2}>
            <Text style={{color: colors.appBlue, marginEnd: 2}}>
              {t('filters.clear')}
            </Text>
            <Icon
              name="close"
              size={15}
              color={colors.appBlue}
              style={{textAlignVertical: 'center'}}
            />
          </CustomButton>
          <CustomButton
            style={{
              backgroundColor: colors.appGreen,
              width: 100,
              flexDirection: 'row',
            }}
            handlePress={this.applyFilters}
            mode={1}>
            <Text style={{color: colors.defaultWhite, marginEnd: 5}}>
              {t('filters.apply')}
            </Text>
            <Icon name="tick" size={16} color={colors.defaultWhite} />
          </CustomButton>
        </View>

        <Modal
          isVisible={this.state.isModalVisible}
          animationIn="slideInUp"
          animationInTiming={300}
          animationOut="slideOutDown"
          animationOutTiming={300}
          hasBackdrop={true}
          backdropOpacity={0.2}
          onBackdropPress={() => this.setState({isModalVisible: false})}
          swipeDirection={['left', 'right']}
          onSwipeComplete={() => this.setState({isModalVisible: false})}
          useNativeDriver={true}>
          <ScrollView
            style={{
              backgroundColor: colors.defaultWhite,
              margin: 10,
              padding: 10,
              flex: 1,
              maxHeight: 400,
              borderRadius: 10,
            }}>
            <Text style={{textAlign: 'center', fontSize: 16, padding: 10}}>
              {this.props.t('filters.selectSubCategories')}
            </Text>
            <RadioGroup
              data={{data: this.state.subCategories, id: 5}}
              onSelect={this.handleRadioSelect}
            />
          </ScrollView>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentFilters: state.jobsReducer.currentFilters,
});

export default connect(mapStateToProps)(withTranslation()(Filter));
